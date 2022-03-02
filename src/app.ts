import { Server } from './server';
import { configuration } from './config'

export class App {
  server?: Server;

  async start() {
    const port = configuration.hostPort || '5000';
    this.server = new Server(port);
    return this.server.listen();
  }

  get httpServer() {
    return this.server?.getHTTPServer();
  }

  async stop() {
    return this.server?.stop();
  }
}
