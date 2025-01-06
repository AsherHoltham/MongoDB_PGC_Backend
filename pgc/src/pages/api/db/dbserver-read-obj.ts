import type { NextApiRequest, NextApiResponse } from 'next';
import { WithId } from 'mongodb';
import DataBase from '../../../lib/db/DataBase';
import { Document } from '../../../types';

type Data = {
    message?: WithId<Document> | string | null;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) 
{
    console.log("----------->dbserver-read-obj");
    if (req.method === 'GET') {
        try {
            const { field, value, type } = req.query; // Extract 'field', 'value', and 'type' from the query parameters
            console.log(field, value, type);
            if (!field || !value || !type) {
                return res.status(400).json({ message: 'Missing query parameter(s)' });
            }
            const decodedfield = decodeURIComponent(field as string);
            const decodedvalue = decodeURIComponent(value as string);
            const decodedtype = decodeURIComponent(type as string);
            console.log("----------->GET query decoded and parsed");
            console.log("----------->", decodedfield, decodedvalue, decodedtype);

            let indexes: string[] = [];
            switch(decodedtype){
                case 'User':
                    indexes = ['_uname', '_email'];
                case 'Trip':
                    indexes = ['_code'];
            }
            const dbInstance = DataBase.getInstance("PGC"); // Initialize database instance and request Document
            await dbInstance.initDb<Document>(indexes, decodedtype);
            const document = await dbInstance.requestDocument<Document>(decodedtype, decodedfield, decodedvalue);
            if (!document) {
                console.log(`----------->GET ${decodedfield}: ${decodedvalue} from Collection: ${decodedtype} IS NOT IN DB!`);
            } else {
                console.log(`----------->GET ${decodedfield}: ${decodedvalue} from Collection: ${decodedtype} SUCCESS!`);
            }
            const result = JSON.stringify(document);
            console.log(`----------->${result}: from query`);

            return res.status(200).json({message: document});
        } catch (error: any) {
            console.error('GET Query Error:', error);
            return res.status(500).json({ message: 'Internal Server Error.' });
        }
    }
}