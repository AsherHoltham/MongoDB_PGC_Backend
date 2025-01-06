import { ObjectId } from 'mongodb';

export interface User {
    username: string;
    password: string; // 10 <= password.length <= 25
    email: string;
    verification_id: string; // 5 characters: '__0__' if verified, else random 5 chars
    trips: ObjectId[];
}