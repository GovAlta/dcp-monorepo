import express from 'express';
import cors from 'cors';

const port = process.env.PORT ? Number(process.env.PORT) : 3333;

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

app.listen(port, () => {
  console.log(`[ ready ] ${port}`);
});
