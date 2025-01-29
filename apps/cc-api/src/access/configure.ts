import { User } from '@abgov/adsp-service-sdk';
import { Application } from 'express';
import { PassportStatic, Strategy } from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { environment } from '../environments/environment';
import { DataCache } from '../cache/types';
import { Logger } from 'winston';
import { getKeyProvider } from './jwtKeyProvider';

interface ConfigureOptions {
    tenantStrategy: Strategy;
    cache: DataCache;
    logger: Logger;
}

function resolveRoles(serviceAud, {realm_access, resource_access}) {
    return Object.entries(resource_access || {}).reduce((roles, [client, clientRoles]: [string, {roles: string[]}]) => {
        // Include client roles of the current service with unqualified names.
        // These roles are included in both qualified and unqualified forms.
        if (client === serviceAud) {
          roles.push(...(clientRoles?.roles || []));
        }
    
        // Include all client roles with qualified names.
        roles.push(...(clientRoles?.roles?.map((clientRole) => `${client}:${clientRole}`) || []));
    
        return roles;
    }, realm_access?.roles || []);
}


const verifyCallback = (req, payload, done) => {
    const user: Express.User = {
      id: payload.sub,
      name: payload.name || payload.preferred_username,
      email: payload.email,
      roles: resolveRoles(environment.SAML_CLIENT_ID, payload),
      isCore: false,
      token: {
        ...payload,
        bearer: req.headers.authorization?.substring(7),
      },
    };

    console.log("user", user);

    done(null, user, null);
};

export function configurePassport(
    app: Application,
    passport: PassportStatic,
    { tenantStrategy, cache, logger }: ConfigureOptions
) {
    app.use(passport.initialize());

    passport.use('jwt', new JwtStrategy(
        {
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          audience: null,
          secretOrKeyProvider: getKeyProvider(cache, logger),
          passReqToCallback: true,
        },
        verifyCallback
    ));
    passport.use('tenant', tenantStrategy);

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user as User);
    });
}
