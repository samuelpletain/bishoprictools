import express, { Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import propositions from './routes/propositions';
import callings from './routes/callings';
import wards from './routes/wards';
import stakes from './routes/stakes';
import members from './routes/members';
import auth from './routes/auth';
import * as swaggerUi from "swagger-ui-express";
import swaggerDocument from './swagger-output.json';
const cookieSession = require('cookie-session');
const passport = require('passport');

dotenv.config();

const app: Express = express();
const port = process.env.PORT || "3000";
const dbstring = process.env.ATLAS_URI || "";
const host = process.env.RENDER_EXTERNAL_URL || "http://localhost";

app.set('trust proxy', 1)

app.use(cookieSession({
  name: 'session',
  maxAge: 24 * 60 * 60 * 1000,
  keys: [process.env.COOKIE_KEY]
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});


app.use('/', propositions);

app.use('/', callings);

app.use('/', wards);

app.use('/', stakes);

app.use('/', members);

app.use('/', auth);


mongoose.connect(dbstring).then(() => {
  console.log('Successfully connected to MongoDB');
  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at ${host}:${port}`);
  });
}).catch((err: Error) => {
  console.log(err);
  console.log('Not connected to MongoDB');
});

export default app;