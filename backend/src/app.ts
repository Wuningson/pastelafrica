import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import env from './config/env';
import errorHandler from './global/error-handler';
import routes from './routers/url.routes';
import database from './config/database';
import morgan from 'morgan';

const app = express();

database();

app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
app.use(express.json());

app.use(routes);

app.use((error: any, _: Request, res: Response, __: NextFunction) => {
  return errorHandler(error, res);
});

app.listen(env.port, () => {
  console.log(`App is listening on port ${env.port}`);
});
