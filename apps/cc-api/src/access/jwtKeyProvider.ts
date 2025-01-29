import { JwksClient } from "jwks-rsa";
import jwtDecode from 'jwt-decode';
import { Logger } from "winston";
import { DataCache } from "../cache/types";
import { getJwksClient } from "./jwksClient";

const LOG_CONTEXT = { context: 'JwtKeyProvider' };

export function getKeyProvider(cache: DataCache, logger: Logger) {
    return async function(_req, token, done) {
        try {
            const { kid } = jwtDecode<{ kid: string }>(token, { header: true });
            const { iss } = jwtDecode<{ iss: string }>(token);

            console.log(`Decoded JWT from request with iss '${iss}' and kid '${kid}'...`, LOG_CONTEXT);

            const client: JwksClient = await getJwksClient(iss, cache, logger);

            console.log(`Retrieving public key from JWKS client...'`, LOG_CONTEXT);
            
            client.getSigningKey(kid, (err, key) => {
                if (err) {
                    console.log(`Error encountered in request to JWKS client. ${err}`, LOG_CONTEXT);
                }
                done(err, key?.getPublicKey());
            });
        } catch (err) {
            console.log(`Error encountered verifying token signature. ${err}`);
            done(err);
        }
    };
}