import { MongoClient } from 'mongodb'

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'file_manager';

    this.url = `mongodb://${host}:${port}`;
    this.databaseName = database;
    this.client = new MongoClient(this.url, {useNewUrlParser: true, userUnifiedTopology: true})

    this.client.connect()
    .then(() => {
      console.log(`Connected to mongodb ${this.url}`);
    })
    .catch((error) => {
      console.error(`MongoDB connection error: ${error.message}`)
    })
  }

  isAlive() {
    return this.client.isConnected();
  }

  async nbUsers() {
    const db = this.client.db(this.databaseName);
    const count = await usersCollection.countDocuments();
    return count;
  }

  async nbFiles() {
    const db = this.client.db(this.databaseName);
    const filesCollection = db.collection('files');
    const count = await filesCollection.countDocuments();
    return count;
  }
}

const dbClient = new DBClient();

export default dbClient;
