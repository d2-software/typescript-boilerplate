import { Server } from './libs/server';
import { configuration } from './config';
import { Connection } from './libs/connection';
import { Logger } from './libs/logger';

export class App {
  server?: Server;
  connection?: Connection;
  logger?: Logger;

  async start() {
    const port = configuration.hostPort || '5000';
    const dbUri = configuration.database.uri;
    this.server = new Server(port);
    this.connection = new Connection(dbUri);
    this.logger = new Logger(configuration.logsDir, configuration.environment);

    await this.connection.connect();
    await this.logger.init();

    return this.server.listen();
  }

  get httpServer() {
    return this.server?.getHTTPServer();
  }

  async stop() {
    return this.server?.stop();
  }
}
