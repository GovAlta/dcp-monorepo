import express from 'express';
import cors from 'cors';
import { environment } from './environment';


const port = process.env.PORT ? Number(process.env.PORT) : 3333;

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

app.listen(port, () => {
  console.log(`[ ready ] ${port}`);
  console.log(`[ env ] KEYCLOAK_ROOT_URL: ${environment.KEYCLOAK_ROOT_URL}`);
  console.log(`[ env ] REALM: ${environment.REALM}`);
  console.log(`[ env ] CLIENT_ID: ${environment.CLIENT_ID}`);
  console.log(`[ env ] CLIENT_SECRET: ${environment.CLIENT_SECRET}`);
  console.log(`[ env ] LOG_LEVEL: ${environment.LOG_LEVEL}`);
  console.log(`[ env ] PORT: ${environment.PORT}`);
  console.log(`[ env ] DIRECTORY_URL: ${environment.DIRECTORY_URL}`);
});
