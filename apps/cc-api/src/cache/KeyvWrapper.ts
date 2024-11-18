import Keyv from 'keyv';
import type { DataCache } from "./types";
import { CacheConfigs } from '.';
import { Logger } from 'winston';

const DEFAULT_TTL = 60 * 60 * 1000;

export default class KeyvWrapper implements DataCache {
    #cache;
    
    constructor(logger: Logger) {
        this.#cache = new Keyv();
        this.#cache.on('error', (error) => logger.error(error));
        this.#cache.on('clear', () => logger.info('Cache cleared'));
        this.#cache.on('disconnect', () => logger.info('Cache disconnected'));
    }

    async get(key: string): Promise<object | undefined> {
        return this.#cache.get(key);
    }

    async set(key: string, value: object): Promise<void> {
        const ttl = CacheConfigs[key]?.ttl || DEFAULT_TTL;
        return this.#cache.set(key, value, ttl);
    }

    async delete(key: string): Promise<void> {
        return this.#cache.delete(key);
    }

    async clear(): Promise<void> {
        return this.#cache.clear();
    }

    async has(key: string): Promise<boolean> {
        const value = await this.get(key);
        return Promise.resolve(!!value);
    }
}