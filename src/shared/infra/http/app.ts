import 'express-async-errors';

import cors from 'cors';
import { config } from 'dotenv-safe';
import express from 'express';

import api from '@config/api';
import { errorsHandler } from '@shared/handlers/ErrorsHandler';
import { routes } from './routes';

config({ allowEmptyValues: true });

const apiConfig = api();
const app = express();

app.use(cors());

app.use(express.json());
app.use(apiConfig.BASE_URL, routes);

app.use(errorsHandler);

export { app };
