import mongoose from 'mongoose';
import { Express } from 'express';

const db = {
  dbConnect: async function (
    app: Express,
    dbstring: string,
    host: string,
    port: string
  ) {
    mongoose
      .connect(dbstring)
      .then(() => {
        console.log('Successfully connected to MongoDB');
        app.listen(port, () => {
          console.log(`⚡️[server]: Server is running at ${host}:${port}`);
        });
      })
      .catch((err: Error) => {
        console.log(err);
        console.log('Not connected to MongoDB');
      });
  },
  dbClose: async function () {
    mongoose.disconnect();
  },
};

export default db;
