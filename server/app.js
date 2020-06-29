import express from "express";
import bodyPaser from "body-parser";
import path from 'path';
import cors from 'cors'
import { models, logger, httpLogger } from "./config";
import router from './routes';

const app = express();

app.use(cors())
app.use(httpLogger);
app.use(bodyPaser.json());
app.use(bodyPaser.urlencoded({ extended: false }));

// API ROUTES
app.use('/api', router);

// STATIC FILE FOR REACT FRONTEND
app.use('/static', express.static(path.resolve(__dirname, '../../client/build/static')));

// RENDER REACT FRONTEND
app.get('*', (req, res) => {
  console.log({ __dirname })
  res.sendFile(path.resolve(__dirname, '../../client/build/index.html'));
});

// catch 404 and forward to error handler
app.use((_, __, next) => {
  const err = new Error('Not Found');
  err.statusCode = 404;
  next(err);
});

// error handler
app.use(({ message, statusCode = 500, stack }, _, res, __) => {
  if (statusCode === 500) logger.info(stack);

  res.status(statusCode).send({
    message: statusCode === 500 ? "Internal server error" : message,
    status: "fail",
  });
});

export default app;
