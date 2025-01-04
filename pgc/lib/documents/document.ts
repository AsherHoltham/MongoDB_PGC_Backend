import { User } from './user';
import { Trip } from './trip';
import { ObjectId } from 'mongodb';

export class Document {
    private _id: ObjectId;
    private _data: User | Trip;

    // Corrected the spelling of 'constructor'
    constructor(id: ObjectId, type: string, data: User | Trip) {
        this._id = id;
        this._data = data;
    }

    // Added return types for better type safety
    public getId(): ObjectId {
        return this._id;
    }

    public getData(): User | Trip {
        return this._data;
    }

    public retIndexes(): string[] {
        return ['_id'];
    }
}