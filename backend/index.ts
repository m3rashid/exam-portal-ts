/// <reference path="./index.d.ts" />
import 'dotenv/config';
import cors from 'cors';
import path from 'path';
import helmet from 'helmet';
import logger from 'morgan';
import xss from 'xss-clean';
import mongoose from 'mongoose';
import { IError } from 'utils/error';
import passport from 'utils/passport';
import compression from 'compression';
import { isDevelopment } from 'utils/utils';
import expressSession from 'express-session';
import express, { NextFunction, Request, Response } from 'express';

const app = express();
app.use(xss());
app.use(helmet());
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(
  cors({
    credentials: true,
    origin: isDevelopment
      ? 'http://localhost:3000'
      : 'https://www.leagueonline.sg',
  })
);
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
isDevelopment && mongoose.set('debug', true);

// routes

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.use((err: any, req: Request, res: Response, _: NextFunction) => {
  try {
    const error: IError = JSON.parse(err);
    console.error('Error: ', error);
    return res.status(error.statusCode).json({
      message: error.message || error.name || 'Internal Server Error',
    });
  } catch (Err) {
    console.log('Error: ', Err);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

const port = isDevelopment
  ? process.env.PORT_DEV || 5000
  : process.env.port || 80;

app.listen(port, async () => {
  try {
    await mongoose.connect(
      isDevelopment
        ? (process.env.MONGODB_TEST_URI as string)
        : (process.env.MONGODB_PROD_URI as string)
    );
    console.log('Mongoose is connected');
    console.log(`Server running on port ${port}`);
  } catch (err: any) {
    console.error('MongoDB connection error');
    console.error(err);
    process.exit(1);
  }
});
