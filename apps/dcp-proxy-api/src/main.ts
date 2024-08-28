import express from 'express';
import cors from 'cors';

// const host = process.env.HOST ?? 'localhost';
// const port = process.env.PORT ? Number(process.env.PORT) : 33;
const port = 3333;

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

app.get('/health', (req, res) => {
  res.send({ message: 'healthy API' });
});

app.listen(port, () => {
  console.log(`[ ready ] listening on port ${port}`);
});
