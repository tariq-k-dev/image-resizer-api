import express from 'express';
import path from 'path';
import routes from './routes/index';
import rateLimit from 'express-rate-limit';

const app = express();
const PORT = (process.env.PORT as unknown as number) || 3000;
const HOST = 'http://localhost:';

// set up rate limiter: maximum of five requests per minute
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'dist')));
app.use(limiter, routes);

app.listen(PORT, () => {
  console.log(`Listening at ${HOST + PORT}`);
});

export default app;
