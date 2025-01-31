import { JwksClient } from "jwks-rsa";
import { Logger } from "winston";
import { DataCache } from "../cache/types";
import { environment } from "../environments/environment";
import axios from "axios";

const LOG_CONTEXT = { context: 'JwksClient' };
const ISSUER_CACHE_TTL = 60 * 60 * 1000; // an hour

let jwksClient: JwksClient | undefined;

export async function getJwksClient(iss: string, cache: DataCache, logger: Logger): Promise<JwksClient> {
    logger.info(`Creating JWKS client for iss '${iss}'...'`, LOG_CONTEXT);

    const issuerCached = await cache.has(iss);
    if (issuerCached) {
        logger.info(`Found cached JWKS client option for iss '${iss}'.'`, LOG_CONTEXT);
        return jwksClient;
    }
    
    const oidcUrl = new URL(`/auth/realms/${environment.REALM}/.well-known/openid-configuration`, new URL(environment.KEYCLOAK_ROOT_URL));
    const { data } = await axios.get<{ issuer: string; jwks_uri: string }>(oidcUrl.href);

    if (data.issuer !== iss) {
        throw new Error(
            `Issuer from token (${iss}) does not match issuer from openid-configuration (${data.issuer}).`
        );
    }

    const clientOptions = {
        jwksUri: data.jwks_uri,
        cache: true,
    }

    jwksClient = new JwksClient(clientOptions);

    // Cant cache jwks client in keyv since its a class instance, only caching the options to recreate the client
    cache.set(iss, clientOptions, ISSUER_CACHE_TTL);

    logger.info(`Created and cached JWKS client for iss '${iss}'.'`, LOG_CONTEXT);

    return jwksClient;
}