import * as dotenv from 'dotenv';
import * as envalid from 'envalid';
import * as util from 'util';

dotenv.config();

export const environment = envalid.cleanEnv(
  process.env,
  {
    KEYCLOAK_ROOT_URL: envalid.str({
      default: 'https://access-uat.alberta.ca',
    }),
    REALM: envalid.str({ default: '' }),
    CLIENT_ID: envalid.str({ default: 'urn:ads:cc:internal' }),
    SAML_CLIENT_ID: envalid.str({ default: 'urn:ads:cc:uiam_saml' }),
    CLIENT_SECRET: envalid.str({ default: '' }),
    LOG_LEVEL: envalid.str({ default: 'debug' }),
    PORT: envalid.str({ default: '3333' }),
    RECAPTCHA_SECRET: envalid.str({ default: '' }),
    DIRECTORY_URL: envalid.url({
      default: 'https://directory-service.adsp-uat.alberta.ca',
    }),
    REVIEWER_EMAILS: envalid.str({
      default: 'subbu.mettu@gov.ab.ca,han.wen@gov.ab.ca',
    }), // email1,email2
    CACHE_TTL: envalid.str({ default: '1800000' }), // 30min
    ALLOWED_ORIGINS: envalid.str({ default: '' }), // comma separated list of allowed urls strings or regex
  },
  {
    reporter: ({ errors }) => {
      if (Object.keys(errors).length !== 0) {
        console.error(`Invalid env vars: ${util.inspect(errors)}`);
      }
    },
  },
);
