import { connect, Mongoose } from 'mongoose';

export class Connection {
  connection: Mongoose;
  uri: string;

  constructor(uri) {
    this.uri = uri;
  }

  async connect() {
    try {
      this.connection = await connect(this.uri);
      this.connection.set('debug', true);

      console.log(`Connection with Mongo up`);
    } catch (connectionError) {
      console.log(connectionError);
    }
  }

  async close() {
    try {
      await this.connection.connection.close();
    } catch (closeConnectionError) {
      console.log(closeConnectionError);
    }
  }
}
