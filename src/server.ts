import express, { Express, json, NextFunction, Request, Response, Router, urlencoded } from 'express';
import { Server as HttpServer } from 'http';
import helmet from 'helmet';
import httpStatus from 'http-status';
import { registerRoutes } from './routes';

export class Server {
  private express: Express;
  private port: string;
  private httpServer?: HttpServer;

  constructor(port: string) {
    this.port = port;

    this.express = express();
    this.express.use(json());
    this.express.use(urlencoded({ extended: true }));

    this.express.use(helmet.xssFilter());
    this.express.use(helmet.noSniff());
    this.express.use(helmet.hidePoweredBy());
    this.express.use(helmet.frameguard({ action: 'deny' }));

    const router = Router();

    this.express.use(router);
    registerRoutes(router);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      console.log(err);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
    });
  }

  async listen(): Promise<void> {
    return new Promise(resolve => {
      this.httpServer = this.express.listen(this.port, () => {
        console.log(`Server app running at http://localhost:${this.port} in ${this.express.get('env')} mode`);
        console.log(' Press CTRL-C to stop\n');
      });
      resolve();
    });
  }

  getHTTPServer() {
    return this.httpServer;
  }

  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.httpServer) {
        this.httpServer.close(error => {
          if (error) {
            return reject(error);
          }
          return resolve();
        });
      }
      return resolve();
    });
  }
}
