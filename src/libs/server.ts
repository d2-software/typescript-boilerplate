import express, { Express, json, NextFunction, Request, Response, urlencoded } from 'express';
import { Server as HttpServer } from 'http';
import Router from 'express-promise-router';
import helmet from 'helmet';
import { registerRoutes } from '../routes';
import { ApiException } from '../errors/api.exception';
import { Logger } from './logger';
import { container } from '../dependency-injection';

export class Server {
  private express: Express;
  private readonly port: string;
  private httpServer?: HttpServer;
  private logger: Logger;

  constructor(port: string) {
    this.port = port;

    this.express = express();
    this.express.use(json());
    this.express.use(urlencoded({ extended: true }));
    this.logger = container.get('App.libs.logger');

    this.express.use(helmet.xssFilter());
    this.express.use(helmet.noSniff());
    this.express.use(helmet.hidePoweredBy());
    this.express.use(helmet.frameguard({ action: 'deny' }));

    const router = Router();

    this.express.use(router);
    registerRoutes(router);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      this.logger.error(err.message);
      console.log(err);

      let errorToShow: ApiException;

      if (!(err instanceof ApiException)) {
        console.log('transform error');
        errorToShow = new ApiException(err.message);
      } else {
        errorToShow = err;
      }

      res.status(errorToShow.code).send(errorToShow.toJson());
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
