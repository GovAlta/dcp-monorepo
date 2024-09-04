import express from 'express';
import cors from 'cors';
import { environment } from './environments/environment';
import {
  AdspId,
  ServiceMetricsValueDefinition,
  initializePlatform,
  instrumentAxios,
} from '@abgov/adsp-service-sdk';
import helmet from 'helmet';
import { createLogger } from '@abgov/adsp-service-sdk/src/utils';
import { configurePassport } from './access/configure';
import * as passport from 'passport';
import { applyGatewayMiddleware } from './routes/forms';


const logger = createLogger('digital_marketplace', environment.LOG_LEVEL);

const initializeApp = async (): Promise<express.Application> => {
  const app = express();


  app.use(helmet());
  app.use(cors());
  app.use(express.json({ limit: '1mb' }));

  instrumentAxios(logger);

  const serviceId = AdspId.parse(environment.CLIENT_ID);
  const accessServiceUrl = new URL(environment.KEYCLOAK_ROOT_URL);

  const {
    healthCheck,
    metricsHandler,
    traceHandler,
    tenantStrategy,
    tenantHandler,
    tenantService,
    directory,
    tokenProvider
  } = await initializePlatform(
    {
      serviceId,
      displayName: 'digital-marketplace gateway',
      description: 'Gateway to provide anonymous and session access to some marketplace functionality.',
      values: [ServiceMetricsValueDefinition],
      clientSecret: environment.CLIENT_SECRET,
      accessServiceUrl,
      directoryUrl: new URL(environment.DIRECTORY_URL)
    },
    { logger }
  );

  configurePassport(app, passport, { tenantStrategy });

  app.use(metricsHandler);
  app.use(traceHandler);

  app.use("/marketplace", passport.authenticate(['tenant','anonymous'], { session: false }), tenantHandler)
  await applyGatewayMiddleware(app, {
    logger,
    directory,
    tokenProvider,
    tenantService,
  });
  
  app.get('/health', async (req, res) => {
    const platform = await healthCheck();
    res.json(platform);
  });

  return app;
};



initializeApp().then((app) => {
  const port = environment.PORT ? Number(environment.PORT) : 3333;
  app.listen(port, () => {
    console.log(`[ ready ] ${environment.PORT}`);
  });
});
