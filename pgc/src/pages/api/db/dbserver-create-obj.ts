import type { NextApiRequest, NextApiResponse } from 'next';
import { WithId, ObjectId} from 'mongodb';
import DataBase from '../../../lib/db/DataBase';
import { Document } from '../../../types';

type Data = {
    message?: WithId<Document> | string | null;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) 
{
    console.log("----------->dbserver-create-obj");
    if (req.method === 'POST') {
        try{
            console.log(req.body);
            const { type, data } = req.body;
            if (!type || !data ) {
                return res.status(400).json({ message: 'Missing data parameter(s)' });
            }
            let indexes: string[] = [];
            switch(type){
                case 'User':
                    indexes = ['username', 'email'];
                case 'Trip':
                    indexes = ['idkyet'];
            }
            const dbInstance = DataBase.getInstance("PGC"); // Initialize database instance and request Document
            await dbInstance.initDb<Document>(indexes, type);
            await dbInstance.addDocument<Document>(type, data);
            console.log("----------->Added New Document to DB");
    
            return res.status(201).json({ message: 'User registered successfully.' });
        } catch (error: any) {
            console.error('Registration Error:', error);
            console.log(error);
            return res.status(500).json({ message: 'Internal Server Error.' });
        }
    }
}