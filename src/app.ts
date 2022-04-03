import { Server } from './libs/server';
import { configuration } from './config';
import { Connection } from './libs/connection';

export class App {
  server?: Server;
  connection?: Connection;

  async start() {
    const port = configuration.hostPort || '5000';
    const dbUri = configuration.database.uri;
    this.server = new Server(port);
    this.connection = new Connection(dbUri);

    await this.connection.connect();
    return this.server.listen();
  }

  get httpServer() {
    return this.server?.getHTTPServer();
  }

  async stop() {
    await this.connection?.close();
    await this.server?.stop();
    return true;
  }
}
