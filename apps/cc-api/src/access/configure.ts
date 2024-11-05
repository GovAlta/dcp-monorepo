import { User } from '@abgov/adsp-service-sdk';
import { Application } from 'express';
import { PassportStatic, Strategy } from 'passport';
import { Strategy as AnonymousStrategy } from 'passport-anonymous';

interface ConfigureOptions {
    tenantStrategy: Strategy;
}

export function configurePassport(
    app: Application,
    passport: PassportStatic,
    { tenantStrategy }: ConfigureOptions
) {


    app.use(passport.initialize());

    passport.use('anonymous', new AnonymousStrategy());
    passport.use('tenant', tenantStrategy);
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user as User);
    });
}
