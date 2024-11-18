import { Logger } from "winston";
import KeyvCache from "./KeyvWrapper";
import { type DataCache } from "./types";

export enum CacheKeys {
    SERVICES = 'services',
    SCHEMA = 'schema',
}

export const CacheConfigs = {
    [CacheKeys.SERVICES]: {
        ttl: 60 * 60 * 1000,  // 1 hour
    },
    [CacheKeys.SCHEMA]: {
        ttl: 12 * 60 * 60 * 1000, // half a day
    },
}

export function getCache(logger: Logger): DataCache {
    return new KeyvCache(logger);
}