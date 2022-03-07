import * as dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { join } from 'path';

dotenv.config({ path: `${__dirname}/../.env` });

export const configuration = {
  hostPort: process.env.PORT,
  database: {
    uri: process.env.DB_CONNECTION_URI
  },
  token: {
    expiresIn: 3600,
    algorithm: 'RS256',
    keys: {
      private: readFileSync(join(__dirname, process.env.TOKEN_KEYS_DIRECTORY ?? 'keys', 'private.key')),
      public: readFileSync(join(__dirname, process.env.TOKEN_KEYS_DIRECTORY ?? 'keys', 'public.key'))
    }
  }
};
