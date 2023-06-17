import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import * as mongoose from 'mongoose';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || "3000";
const dbstring = process.env.ATLAS_URI || "";
const host = process.env.RENDER_EXTERNAL_URL || "http://localhost";

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

mongoose.connect(dbstring).then(() => {
  console.log('Successfully connected to MongoDB');
  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at ${host}:${port}`);
  });
}).catch((err: Error) => {
  console.log(err);
  console.log('Not connected to MongoDB');
});

