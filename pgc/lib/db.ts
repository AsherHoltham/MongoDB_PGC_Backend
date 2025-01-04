import { Db, MongoClient, Collection, Document, Filter, InsertOneResult, DeleteResult, WithId } from 'mongodb';
import clientPromise from './api-inits/mongodb'; // Ensure this exports a connected MongoClient

export class DataBase {
  private static instance: DataBase;
  private client: MongoClient | null = null;
  private db: Db | null = null;

  private constructor(private dbName: string) {}

  public static getInstance(dbName: string): DataBase {
    if (!DataBase.instance) DataBase.instance = new DataBase(dbName);
    return DataBase.instance;
  }

/**
 * ///////////////////////////////////////////////////////////////////////////////////////////////////////////
 * INIT Functions - Constructs a MongoDB connection.
 *////////////////////////////////////////////////////////////////////////////////////////////////////////////
  public async initDb<T extends Document>( indexes: string[], collectionName: string ): Promise<Db | null> 
  {
    console.log("initDB");
    if (!this.db) {
      try {
        await this.connectDb(); // Ensure connection is awaited
        console.log(`Database "${this.dbName}" connected successfully.`);
  
        // Create indexes concurrently
        await Promise.all(
          indexes.map(field => this.createUniqueIndex<T>(field, collectionName))
        );
  
        console.log(`Indexes created successfully for collection "${collectionName}".`);
      } catch (error) {
        console.error('Error initializing database:', error);
        throw error; // Rethrow to notify calling code
      }
    } else {
      console.log(`Database "${this.dbName}" is already initialized.`);
    }
    return this.db;
  }

  private async connectDb(): Promise<void> 
  {
    if (this.client && this.db) {
      console.log(`Already connected to ${this.dbName}`);
      return;
    }
    try {
      this.client = await clientPromise;
      this.db = this.client.db(this.dbName);
      console.log(`Connected to ${this.dbName}`);
    } catch (error) {
      console.error(`Failed to connect to ${this.dbName}`, error);
      throw error; // Re-throw the error after logging
    }
  }

  public async initCollection<T extends Document>(indexes: string[], collectionName: string): Promise<Db | null> 
  {
    if(!this.db){
      await this.connectDb();
    }
    try {
      for (let i = 0; i < indexes.length; i++) {
        await this.createUniqueIndex<T>(indexes[i], collectionName);
      }
    } catch (error) {
      console.error('Error initializing Collection:', error);
      throw error;
    }
    return this.db;
  }

  private async createUniqueIndex<T extends Document>(fieldName: string, collectionName: string): Promise<void> 
  {
    try {
      const collection = this.getCollection<T>(collectionName);
      await collection.createIndex({ [fieldName]: 1 }, { unique: true });
      console.log(`Unique index created on field: "${fieldName}" in collection "${collectionName}".`);
    } catch (error: any) {
      // Check if the error is about the index already existing
      if (error.code === 85 || error.codeName === 'IndexOptionsConflict') {
        console.warn(`Index on field "${fieldName}" already exists in collection "${collectionName}".`);
      } else {
        console.error(`Error creating unique index on "${fieldName}" in collection "${collectionName}":`, error);
        throw error; // Rethrow unexpected errors
      }
    }
  }

  private getCollection<T extends Document>(collectionName: string): Collection<T> 
  {
    if (!this.db) {
      throw new Error('Database not initialized. Call initDb() first.');
    }
    return this.db.collection<T>(collectionName);
  }
/**
 * ///////////////////////////////////////////////////////////////////////////////////////////////////////////
 * INIT Functions - Constructs a MongoDB connection.
 *////////////////////////////////////////////////////////////////////////////////////////////////////////////



  private buildQuery(field: string, value: any): Filter<any> 
  {
    return { [field]: value };
  }

  /**
   * documentExists - Checks if a document with the specified field value exists in the collection.
   * @param field - The field name to check.
   * @param value - The value to search for in the specified field.
   * @param collectionName - The name of the collection to search in.
   * @returns A promise that resolves to true if the document exists, false otherwise.
   */
  public async documentExists<T extends Document>(field: string, value: any, collectionName: string): Promise<boolean> 
  {
    if(!this.db){
      await this.connectDb();
    }
    try {
      const collection = this.getCollection<T>(collectionName);
      const query = this.buildQuery(field, value );
      const document = await collection.findOne(query);
      return document !== null;
    } catch (error) {
      console.error(`Error checking existence of document with ${field} = "${value}" in collection "${collectionName}":`, error);
      throw error; // Rethrow to notify calling code
    }
  }

  /**
   * addDocument - Inserts a document into the specified collection.
   * @param collectionName - The name of the collection to insert the document into.
   * @param document - The document to be inserted.
   * @returns A promise that resolves to the result of the insertion.
   */
  public async addDocument<T extends Document>( collectionName: string, document: any ): Promise<InsertOneResult<T>> 
  {
    // Ensure the database is connected
    if (!this.db) {
      await this.connectDb();
    }

    try {
      const collection = this.getCollection<T>(collectionName);
      const result: InsertOneResult<T> = await collection.insertOne(document);
      console.log(
        `Document inserted into "${collectionName}" with _id: ${result.insertedId}`
      );
      return result;
    } catch (error) {
      console.error(
        `Error inserting document into "${collectionName}":`,
        error
      );
      throw error; // Re-throw the error to notify the caller
    }
  }

  /**
   * removeAllDocuments - Removes all documents from the specified collection.
   * @param collectionName - The name of the collection to remove all documents from.
   * @returns A promise that resolves to the result of the deletion.
   */
  public async removeAllDocuments<T extends Document>( collectionName: string ): Promise<DeleteResult> 
  {
    // Ensure the database is connected
    if (!this.db) {
      await this.connectDb();
    }

    try {
      const collection = this.getCollection<T>(collectionName);
      const result: DeleteResult = await collection.deleteMany({});

      console.log(`Successfully deleted ${result.deletedCount} documents from "${collectionName}".`);
      return result;
    } catch (error) {
      console.error(`Error deleting all documents from "${collectionName}":`, error);
      throw error; // Re-throw the error to notify the caller
    }
  }

  /**
   * requestDocument - queries the database
   * @param collectionName - The name of the collection to insert the document into.
   * @param field - The field to be indexed
   * @param value - The value to be searched
   * @returns A promise that resolves to the result of the query.
   */
  public async requestDocument<T extends Document>( collectionName: string, field: string, value: any ): Promise<WithId<T> | null>
  {
    if (!this.db) {
      await this.connectDb();
    }
    try {
      const collection = this.getCollection<T>(collectionName);
      const document: WithId<T> | null = await collection.findOne(this.buildQuery(field, value));
      return document;
    } catch (error) {
      console.error(`Error querying the database from "${collectionName}":`, error);
      throw error;
    }
  }

  /**
   * removeDocument - Removes one document from the specified collection.
   * @param collectionName - The name of the collection to remove all documents from.
   * @returns A promise that resolves to the result of the deletion.
   */
  public async removeDocument<T extends Document>( collectionName: string, field: string, value: any ): Promise<DeleteResult> 
  {
    // Ensure the database is connected
    if (!this.db) {
      await this.connectDb();
    }

    try {
      const collection = this.getCollection<T>(collectionName);
      const result: DeleteResult = await collection.deleteOne(this.buildQuery(field, value));

      console.log(`Successfully deleted ${result.deletedCount} from "${collectionName}".`);
      return result;
    } catch (error) {
      console.error(`Error deleting document from "${collectionName}":`, error);
      throw error; // Re-throw the error to notify the caller
    }
  }
};
export default DataBase;