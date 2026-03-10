import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { json } from 'body-parser';
import { loadEnv } from './config/env';
import { requestLogger } from './middleware/requestLogger.middleware';
import { errorHandler } from './middleware/error.middleware';
import routes from './routes';

const app = express();
const env = loadEnv();

app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN || '*', credentials: true }));
app.use(morgan('dev'));
app.use(json());
app.use(requestLogger);

app.use('/api', routes);

app.use(errorHandler);

export default app;
