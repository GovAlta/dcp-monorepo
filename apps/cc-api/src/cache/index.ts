import { Logger } from "winston";
import KeyvCache from "./KeyvWrapper";
import { type DataCache } from "./types";
import { environment } from "../environments/environment";

export enum CacheKeys {
    SERVICES = 'services',
    SCHEMA = 'schema',
}

export const CacheConfigs = {
    [CacheKeys.SERVICES]: {
        ttl: parseInt(environment.CACHE_TTL),  // 30 min
    },
    [CacheKeys.SCHEMA]: {
        ttl: 12 * 60 * 60 * 1000, // half a day
    },
}

export function getCache(logger: Logger): DataCache {
    return new KeyvCache(logger);
}