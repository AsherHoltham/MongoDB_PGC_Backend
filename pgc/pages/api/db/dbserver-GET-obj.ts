// Generate new ObjectID
// Identify Document type

import type { NextApiRequest, NextApiResponse } from 'next';
import { WithId } from 'mongodb';
import DataBase from '../../../lib/db';
import { Document } from '../../../lib/documents/document';

type Data = {
    message?: WithId<Document> | string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) 
{
    console.log("dbserver-GET-obj");
    if (req.method === 'GET') {
        try {
            // Extract 'field', 'value', and 'type' from the query parameters
            const { field, value, type } = req.query;
            console.log(field, value, type);
            if (!field || !value || !type) {
                return res.status(400).json({ message: 'Missing query parameter(s)' });
            }
            const decodedfield = decodeURIComponent(field as string);
            const decodedvalue = decodeURIComponent(value as string);
            const decodedtype = decodeURIComponent(type as string);

            let indexes: string[] = [];
            switch(decodedtype){
                case 'User':
                    indexes = ['_uname', '_email'];
                case 'Trip':
                    indexes = ['_code'];
            }

            // Initialize database instance and request Document
            const dbInstance = DataBase.getInstance("PGC");
            await dbInstance.initDb<Document>(indexes, decodedtype);
            const document = await dbInstance.requestDocument<Document>(decodedtype, decodedfield, decodedvalue);
            if (!document) {
                return res.status(404).json({ message: `GET ${decodedfield}: ${decodedvalue} from Collection: ${decodedtype}` });
            }


            console.log(`GET ${decodedfield}: ${decodedvalue} from Collection: ${decodedtype} SUCCESS!`);

            const result = JSON.stringify(document);
            console.log(`${result}: from query`);

            return res.status(200).json({message: document});

        } catch (error: any) {
            console.error('GET Query Error:', error);
            return res.status(500).json({ message: 'Internal Server Error.' });
        }
    }
}