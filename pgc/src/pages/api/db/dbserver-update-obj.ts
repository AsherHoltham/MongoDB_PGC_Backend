import type { NextApiRequest, NextApiResponse } from 'next';
import { WithId } from 'mongodb';
import DataBase from '../../../lib/db/DataBase';
import { Document } from '../../../types';

type Data = {
    message?: WithId<Document> | string | null;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) 
{
    console.log("dbserver-update-obj");
    if (req.method === 'PUT') {
        try {
            const { field, value, type, updateField, updateValue } = req.body; // Extract 'field', 'value', and 'type' from the query parameters
            console.log(field, value, type, updateField, updateValue);
            if (!field || !value || !type || !updateField || !updateValue) {
                return res.status(400).json({ message: 'Missing query parameter(s)' });
            }
            console.log("GET query decoded and parsed");

            let indexes: string[] = [];
            switch(type){
                case 'User':
                    indexes = ['_uname', '_email'];
                case 'Trip':
                    indexes = ['_code'];
            }
            const dbInstance = DataBase.getInstance("PGC"); // Initialize database instance and request Document
            await dbInstance.initDb<Document>(indexes, type);
            await dbInstance.updateDocument<Document>(type, field, value, updateField, updateValue);

            return res.status(200).json({ message: 'Data updated successfully' });
        } catch (error: any) {
            console.error('PUT Query Error:', error);
            return res.status(500).json({ message: 'Internal Server Error.' });
        }
    }
}