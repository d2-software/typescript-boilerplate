import * as dotenv from 'dotenv';

dotenv.config({ path: `${__dirname}/../.env` });

export const configuration = {
  hostPort: process.env.PORT,
  database: {
    uri: process.env.DB_CONNECTION_URI
  }
};
