import { connect } from 'mongoose';

export class Connection {
  uri: string;

  constructor(uri) {
    this.uri = uri;
  }

  async connect() {
    try {
      const connection = await connect(this.uri);
      connection.set('debug', true);

      console.log(`Connection with Mongo up`);
    } catch (connectionError) {
      console.log(connectionError);
    }
  }
}
