import { MongoClient, MongoClientOptions } from 'mongodb';
import { config } from '../../../config';

const uri = config.dbKey;

const options: MongoClientOptions = {
    serverApi: {
        version: '1', // Corresponds to ServerApiVersion.v1
        strict: true,
        deprecationErrors: true,
    },
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;


declare global {
    // Allow global variables to store the client promise to prevent multiple connections in development
    // eslint-disable-next-line no-var
    var _mongoClientPromise: Promise<MongoClient>;
  }


  if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable to preserve the client across module reloads
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri, options);
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
  } else {
    // In production mode, create a new client for each connection
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }
  
  export default clientPromise;