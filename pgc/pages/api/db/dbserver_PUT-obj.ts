import type { NextApiRequest, NextApiResponse } from 'next';
import { WithId } from 'mongodb';
import DataBase from '../../../lib/db';
import { Document } from '../../../lib/documents/document';

type Data = {
    message?: WithId<Document> | string | null;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) 
{
    console.log("dbserver-PUT-obj");
    if (req.method === 'PUT') {
        try {
            const { field, value, type } = req.query; // Extract 'field', 'value', and 'type' from the query parameters
            console.log(field, value, type);
            if (!field || !value || !type) {
                return res.status(400).json({ message: 'Missing query parameter(s)' });
            }
            const decodedfield = decodeURIComponent(field as string);
            const decodedvalue = decodeURIComponent(value as string);
            const decodedtype = decodeURIComponent(type as string);
            console.log("GET query decoded and parsed");
            console.log(decodedfield, decodedvalue, decodedtype);

            let indexes: string[] = [];
            switch(decodedtype){
                case 'User':
                    indexes = ['_uname', '_email'];
                case 'Trip':
                    indexes = ['_code'];
            }
            const dbInstance = DataBase.getInstance("PGC"); // Initialize database instance and request Document
            await dbInstance.initDb<Document>(indexes, decodedtype);
    
            //TODO


        } catch (error: any) {
            console.error('PUT Query Error:', error);
            return res.status(500).json({ message: 'Internal Server Error.' });
        }
    }
}