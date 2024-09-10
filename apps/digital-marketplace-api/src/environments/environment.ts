import * as dotenv from 'dotenv';
import * as envalid from 'envalid';
import * as util from 'util';


dotenv.config();

export const environment = envalid.cleanEnv(
  process.env,
  {
    KEYCLOAK_ROOT_URL: envalid.str({ default: 'https://access-uat.alberta.ca' }),
    REALM: envalid.str({ default: '9ddc3790-b16d-48f6-be99-3a5c6ea71326' }),
    CLIENT_ID: envalid.str({ default: 'urn:ads:digital_marketplace:public' }),
    CLIENT_SECRET: envalid.str({ default: '' }),
    LOG_LEVEL: envalid.str({ default: 'debug' }),
    PORT: envalid.num({ default: 3333 }),
    DIRECTORY_URL: envalid.url({ default: 'https://directory-service.adsp-uat.alberta.ca' }),
  },
  {
    reporter: ({ errors }) => {
      if (Object.keys(errors).length !== 0) {
        console.error(`Invalid env vars: ${util.inspect(errors)}`);
      }
    },
  }
);
