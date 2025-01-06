import { ObjectId } from 'mongodb';
import { User } from './User';
import { Trip } from './Trip';

export type Document = {
    _id: ObjectId;
    type: 'User' | 'Trip';
    data: User | Trip;
}