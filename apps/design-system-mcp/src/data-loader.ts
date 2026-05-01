/**
 * GoA Design System Data Loader v2.0
 *
 * Simple data loading with inverted index search.
 * Loads from the design/development folder structure.
 *
 * Structure:
 *   data/design/          - Design decision knowledge (principles, governance, etc.)
 *   data/development/     - Implementation knowledge (components, patterns, workflows)
 *   data/development/examples/ - Example implementations
 */

import { readFile, readdir } from 'fs/promises';
import { join, dirname } from 'path';
import {
  InvertedIndex,
  IndexedItem,
  createSearchableText,
  extractTags,
} from './inverted-index';

/**
 * Resolve the data directory.
 *
 * When esbuild runs with `bundle: false`, the compiled entry point lives at
 * `dist/apps/design-system-mcp/main.js` (a shim that requires the real code
 * from a nested subdirectory). The data/ assets are always copied to the same
 * level as that root shim, so we resolve relative to `require.main.filename`
 * (the shim). Falls back to `__dirname/../data` for local ts-node / tsx usage
 * during development.
 */
function resolveDataDir(): string {
  if (require.main?.filename) {
    return join(dirname(require.main.filename), 'data');
  }
  return join(__dirname, '../data');
}

export interface SearchResult {
  id: string;
  collection: string;
  name?: string;
  summary?: string;
  preview?: string;
  score: number;
  aliases: string[];
}

export interface SearchOptions {
  collection?: string;
  size?: string;
  productType?: string;
  framework?: string;
  status?: string;
  component?: string;
  context?: string;
  maxResults?: number;
}

export class DataLoader {
  private index = new InvertedIndex();
  private initialized = false;

  async initialize(): Promise<void> {
    if (this.initialized) return;

    const startTime = performance.now();
    process.stderr.write(`Loading GoA Design System data...\n`);

    const dataDir = resolveDataDir();

    // === DESIGN KNOWLEDGE ===
    await this.loadFolder(join(dataDir, 'design'), 'design');

    // === DEVELOPMENT KNOWLEDGE ===
    const devDir = join(dataDir, 'development');

    // Components
    await this.loadFolder(join(devDir, 'components'), 'component');

    // Standalone development files
    await this.loadDevelopmentFiles(devDir);

    // === EXAMPLES ===
    await this.loadFolder(join(devDir, 'examples/apps'), 'example');
    await this.loadFolder(join(devDir, 'examples/pages'), 'example');
    await this.loadFolder(join(devDir, 'examples/sections'), 'example');
    await this.loadFolder(join(devDir, 'examples/tasks'), 'example');

    this.initialized = true;

    const stats = this.index.getStats();
    const elapsed = performance.now() - startTime;
    process.stderr.write(
      `Loaded ${stats.totalItems} items in ${elapsed.toFixed(0)}ms\n`,
    );
  }

  /**
   * Search across all data
   */
  async search(
    query: string,
    options: SearchOptions = {},
  ): Promise<SearchResult[]> {
    const { collection, maxResults = 10 } = options;
    // collection filter applied below; other filters (size, productType,
    // framework, status, component, context) accepted in SearchOptions but
    // not yet wired — pending PR #3888 schema fields landing in the data.

    const candidates = this.index.search(query, maxResults * 2);

    const collectionToType: Record<string, string> = {
      components: 'component',
      examples: 'example',
    };

    let filtered = candidates;
    if (collection) {
      const targetType = collectionToType[collection];
      if (targetType) {
        filtered = candidates.filter((c) => c.item.type === targetType);
      } else {
        // Collection has no current data mapping (e.g. guidance, productTypes
        // pending PR #3771 / #3888 ingestion)
        filtered = [];
      }
    }

    const typeToCollection: Record<string, string> = {
      component: 'components',
      example: 'examples',
      design: 'design',
    };

    return filtered.slice(0, maxResults).map((candidate) => {
      const data = candidate.item.data;
      return {
        id: candidate.item.id,
        collection:
          typeToCollection[candidate.item.type] || candidate.item.type,
        name:
          data.componentName ||
          data.name ||
          data.patternName ||
          candidate.item.id,
        summary: data.summary || data.description || data.purpose,
        preview: this.createPreview(data),
        score: candidate.matchCount,
        aliases: Array.isArray(data.aliases) ? data.aliases : [],
      };
    });
  }

  /**
   * Find component IDs that list this example in their relatedExamples field.
   * Reverse lookup: examples don't list their components directly, but
   * components list the examples that use them.
   */
  findComponentsRelatedToExample(exampleId: string): string[] {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const components = this.index.getItemsByType('component' as any);
    return components
      .filter(
        (c) =>
          Array.isArray(c.data.relatedExamples) &&
          c.data.relatedExamples.includes(exampleId),
      )
      .map((c) => c.id);
  }

  /**
   * Get item by ID. Returns a structured wrapper with id, collection,
   * resolved_via, and data — or null if not found.
   *
   * The optional collection param is accepted for forward compatibility;
   * disambiguation logic is Day 2 work, pending the post-PR-3888 data shape.
   */
  get(
    id: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    options: { collection?: string } = {},
  ): {
    id: string;
    collection: string;
    resolved_via: 'id' | 'alias';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
  } | null {
    const typeToCollection: Record<string, string> = {
      component: 'components',
      example: 'examples',
      design: 'design',
    };

    // Try direct lookup
    const directItem = this.index.getItem(id.toLowerCase());
    if (directItem) {
      return {
        id: directItem.id,
        collection: typeToCollection[directItem.type] || directItem.type,
        resolved_via: 'id',
        data: directItem.data,
      };
    }

    // Try common variations (treat as alias matches)
    const variations = [
      id,
      id.replace(/[-_]/g, ''),
      id
        .replace(/([A-Z])/g, '-$1')
        .toLowerCase()
        .slice(1),
    ];

    for (const variation of variations) {
      const item = this.index.getItem(variation);
      if (item) {
        return {
          id: item.id,
          collection: typeToCollection[item.type] || item.type,
          resolved_via: 'alias',
          data: item.data,
        };
      }
    }

    return null;
  }

  /**
   * Get all items of a type
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getByType(type: string): any[] {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.index.getItemsByType(type as any).map((item) => item.data);
  }

  /**
   * Get index statistics
   */
  getStats() {
    return this.index.getStats();
  }

  // Private methods

  private async loadFolder(folderPath: string, type: string): Promise<void> {
    try {
      const files = await readdir(folderPath);

      for (const file of files) {
        if (!file.endsWith('.json')) continue;

        try {
          const filePath = join(folderPath, file);
          const content = await readFile(filePath, 'utf8');
          const data = JSON.parse(content);

          const id =
            data.componentName?.toLowerCase() ||
            data.patternId ||
            data.conceptId ||
            data.exampleId ||
            file.replace('.json', '');

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const indexed: IndexedItem = {
            id,
            type: type as IndexedItem['type'],
            data,
            searchableText: createSearchableText(data),
            tags: extractTags(data),
            category: data.category,
          };

          this.index.addItem(indexed);
        } catch {
          // Skip invalid files silently
        }
      }
    } catch {
      // Folder doesn't exist - that's okay
    }
  }

  private async loadDevelopmentFiles(devDir: string): Promise<void> {
    const devFiles = [
      { file: 'installation.json', type: 'setup' },
      { file: 'tokens.json', type: 'reference' },
      { file: 'responsive.json', type: 'reference' },
      { file: 'wireframe-mode.json', type: 'reference' },
    ];

    for (const { file, type } of devFiles) {
      try {
        const filePath = join(devDir, file);
        const content = await readFile(filePath, 'utf8');
        const data = JSON.parse(content);

        const id = file.replace('.json', '');

        const indexed: IndexedItem = {
          id,
          type: type as IndexedItem['type'],
          data,
          searchableText: createSearchableText(data),
          tags: extractTags(data),
          category: type,
        };

        this.index.addItem(indexed);
      } catch {
        // Skip missing files
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private createPreview(data: any): string {
    const parts: string[] = [];

    if (data.category) parts.push(`[${data.category}]`);
    if (data.tags?.slice(0, 3).length) {
      parts.push(data.tags.slice(0, 3).join(', '));
    }
    if (data.commonUse?.[0]) {
      parts.push(data.commonUse[0]);
    }

    return parts.join(' - ') || '';
  }
}
