import express from 'express';
// import path from 'path';
import routes from './routes/index';

const app = express();
const PORT = (process.env.PORT as unknown as number) || 3000;
const HOST = 'http://localhost:';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('dist'));
app.use(routes);

app.listen(PORT, () => {
  console.log(`Listening at ${HOST + PORT}`);
});

export default app;
