/**
 * GoA Design System Data Loader
 *
 * Loads the generator's flat collection output:
 *   data/components/
 *   data/examples/
 *   data/guidance/
 *   data/foundations/
 *   data/get-started/
 *
 * The ui-components content-generators pipeline produces this shape from the
 * docs site. Each JSON file carries an explicit `id` field (canonical, can
 * contain "/" for nested ids); the filename is a flattened version of that id.
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
  // Explicit override (smoke tests, alternate-deployment scenarios).
  if (process.env.GOA_MCP_DATA_DIR) {
    return process.env.GOA_MCP_DATA_DIR;
  }
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
  private aliasMap = new Map<string, string>(); // lowercase alias -> canonical id
  private initialized = false;

  async initialize(): Promise<void> {
    if (this.initialized) return;

    const startTime = performance.now();
    process.stderr.write(`Loading GoA Design System data...\n`);

    const dataDir = resolveDataDir();

    await this.loadFolder(join(dataDir, 'components'), 'component');
    await this.loadFolder(join(dataDir, 'examples'), 'example');
    await this.loadFolder(join(dataDir, 'guidance'), 'guidance');
    await this.loadFolder(join(dataDir, 'foundations'), 'foundation');
    await this.loadFolder(join(dataDir, 'get-started'), 'get-started');
    await this.loadFolder(join(dataDir, 'productTypes'), 'productType');

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
    const {
      collection,
      size,
      productType,
      framework,
      status,
      component,
      context,
      maxResults = 10,
    } = options;

    // Fetch a wider candidate set when filters are stacked, so the final
    // top-N after filtering still has room. Cheap because the index is O(1).
    const filterCount = [
      size,
      productType,
      framework,
      status,
      component,
      context,
    ].filter(Boolean).length;
    const candidatePoolMultiplier = 2 + filterCount;
    const candidates = this.index.search(
      query,
      maxResults * candidatePoolMultiplier,
    );

    const collectionToType: Record<string, string> = {
      components: 'component',
      examples: 'example',
      guidance: 'guidance',
      foundations: 'foundation',
      'get-started': 'get-started',
      productTypes: 'productType',
    };

    let filtered = candidates;
    if (collection) {
      const targetType = collectionToType[collection];
      if (targetType) {
        filtered = candidates.filter((c) => c.item.type === targetType);
      } else {
        // Collection name not recognized — return empty rather than mixed.
        filtered = [];
      }
    }

    if (size) filtered = filtered.filter((c) => c.item.data.size === size);
    if (productType) {
      filtered = filtered.filter(
        (c) => c.item.data.productType === productType,
      );
    }
    if (framework) {
      filtered = filtered.filter((c) => {
        const frameworks = c.item.data.frameworks;
        return Array.isArray(frameworks) && frameworks.includes(framework);
      });
    }
    if (status) {
      filtered = filtered.filter((c) => c.item.data.status === status);
    }
    if (component) {
      filtered = filtered.filter((c) =>
        recordReferencesComponent(c.item, component),
      );
    }
    if (context) {
      filtered = filtered.filter((c) => {
        const contexts = c.item.data.appliesTo?.contexts;
        return Array.isArray(contexts) && contexts.includes(context);
      });
    }

    const typeToCollection: Record<string, string> = {
      component: 'components',
      example: 'examples',
      guidance: 'guidance',
      foundation: 'foundations',
      'get-started': 'get-started',
      productType: 'productTypes',
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
          data.title ||
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
      guidance: 'guidance',
      foundation: 'foundations',
      'get-started': 'get-started',
      productType: 'productTypes',
    };

    // Try direct lookup (exact id, then lowercased).
    const directItem =
      this.index.getItem(id) ?? this.index.getItem(id.toLowerCase());
    if (directItem) {
      return {
        id: directItem.id,
        collection: typeToCollection[directItem.type] || directItem.type,
        resolved_via: 'id',
        data: directItem.data,
      };
    }

    // Try explicit aliases recorded from data.aliases.
    const aliasedId = this.aliasMap.get(id.toLowerCase());
    if (aliasedId) {
      const item =
        this.index.getItem(aliasedId) ??
        this.index.getItem(aliasedId.toLowerCase());
      if (item) {
        return {
          id: item.id,
          collection: typeToCollection[item.type] || item.type,
          resolved_via: 'alias',
          data: item.data,
        };
      }
    }

    // Try common id variations.
    const variations = [
      id.replace(/[-_]/g, ''),
      id
        .replace(/([A-Z])/g, '-$1')
        .toLowerCase()
        .slice(1),
    ];

    for (const variation of variations) {
      const item =
        this.index.getItem(variation) ??
        this.index.getItem(variation.toLowerCase());
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

          // Prefer the explicit `id` field (new flat-shape data). Fall back to
          // legacy id-bearing fields, then the filename (with __ unflattened
          // back to / so nested ids like get-started/designers/* round-trip).
          const id =
            data.id ||
            data.componentName?.toLowerCase() ||
            data.patternId ||
            data.conceptId ||
            data.exampleId ||
            file.replace(/\.json$/, '').replace(/__/g, '/');

          const indexed: IndexedItem = {
            id,
            type: type as IndexedItem['type'],
            data,
            searchableText: createSearchableText(data),
            tags: extractTags(data),
            category: data.category,
          };

          this.index.addItem(indexed);

          // Register aliases for `get` lookups.
          if (Array.isArray(data.aliases)) {
            for (const alias of data.aliases) {
              if (typeof alias === 'string' && alias.length > 0) {
                this.aliasMap.set(alias.toLowerCase(), id);
              }
            }
          }
        } catch {
          // Skip invalid files silently
        }
      }
    } catch {
      // Folder doesn't exist - that's okay
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
    if (data.description) {
      parts.push(data.description.slice(0, 120));
    }

    return parts.join(' - ') || '';
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function recordReferencesComponent(item: any, component: string): boolean {
  if (item.type === 'component') return item.id === component;
  const data = item.data;
  if (Array.isArray(data.components) && data.components.includes(component)) {
    return true;
  }
  const appliesTo = data.appliesTo?.components;
  if (Array.isArray(appliesTo) && appliesTo.includes(component)) {
    return true;
  }
  return false;
}
