import express from 'express';
import morgan from 'morgan';
import { router } from './routes/index.js';
import { AppError } from './common/errors/appError.js';
import { globalErrorHandler } from './common/errors/error.controller.js';
import { envs } from './config/enviroments/enviroments.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


if (envs.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log('I am running in development');
}

 
//ruotes

app.use('/api/v1', router);

app.all('*', (req, res, next) => {
  return next(
    new AppError(`Can't find ${req.originalUrl} on this server`, 404)
  );
});

//Global Bug Controller
app.use(globalErrorHandler);

export default app;
