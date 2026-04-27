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
  type: string;
  name?: string;
  summary?: string;
  preview?: string;
  score: number;
}

export interface SearchOptions {
  type?: string;
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
    const { type, maxResults = 10 } = options;

    const candidates = this.index.search(query, maxResults * 2);

    let filtered = candidates;
    if (type) {
      filtered = candidates.filter((c) => c.item.type === type);
    }

    return filtered.slice(0, maxResults).map((candidate) => {
      const data = candidate.item.data;
      return {
        id: candidate.item.id,
        type: candidate.item.type,
        name:
          data.componentName ||
          data.name ||
          data.patternName ||
          candidate.item.id,
        summary: data.summary || data.description || data.purpose,
        preview: this.createPreview(data),
        score: candidate.matchCount,
      };
    });
  }

  /**
   * Get item by ID
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get(id: string): any | null {
    // Try direct lookup
    let item = this.index.getItem(id.toLowerCase());

    // Try common variations if not found
    if (!item) {
      const variations = [
        id,
        id.toLowerCase(),
        id.replace(/[-_]/g, ''),
        id
          .replace(/([A-Z])/g, '-$1')
          .toLowerCase()
          .slice(1),
      ];

      for (const variation of variations) {
        item = this.index.getItem(variation);
        if (item) break;
      }
    }

    return item ? item.data : null;
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
