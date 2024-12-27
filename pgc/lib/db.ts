import { Db, Collection, ObjectId, InsertOneResult } from 'mongodb';
import clientPromise from './mongodb';
import { User } from './user'

export class DataBase {
  private db!: Db; 
  private static instance: DataBase
  private constructor(private dbName: string) {}

  /**
   * getInstance - Static method to get the single instance of the Database class.
   * @param dbName - The name of the MongoDB database to connect to.
   * @returns A single instance of the Database class.
   */
  public static getInstance(dbName: string): DataBase {
    if (!DataBase.instance) {
    // If no instance exists, create one and assign it to the static property
      DataBase.instance = new DataBase(dbName);
    }
    // Return the existing instance
    return DataBase.instance;
  }

  // Initialize the database connection
  async init() {
    if (!this.db) {
      const client = await clientPromise;
      this.db = client.db(this.dbName);
      console.log(`Connected to database: ${this.dbName}`);

      await this.createUniqueIndex('_uname');
    }
    return this.db;
  }
  /**
   * createUniqueIndex - Creates a unique index on the specified field.
   * @param fieldName - The field on which to create the unique index.
   */
  private async createUniqueIndex(fieldName: string): Promise<void> {
    try {
      const collection = this.getCollection<User>('users');
      await collection.createIndex({ [fieldName]: 1 }, { unique: true });
      console.log(`Unique index created on field: ${fieldName}`);
    } catch (error) {
      console.error(`Error creating unique index on ${fieldName}:`, error);
      // Optionally, handle specific errors or rethrow
    }
  }

  /**
   * getCollection - Retrieves the specified collection with type safety.
   * @param collectionName - The name of the collection to retrieve.
   * @returns The MongoDB Collection instance.
   */
  private getCollection<T>(collectionName: string): Collection<T> {
    if (!this.db) {
      throw new Error('Database not initialized. Call init() first.');
    }
      return this.db.collection<T>(collectionName);
  }




  checkIfUnameExists(uname: string) {

  }
  addUser(newUser: User) {

  }

};

export default DataBase;