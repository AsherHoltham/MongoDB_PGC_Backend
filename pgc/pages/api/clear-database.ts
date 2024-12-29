import type { NextApiRequest, NextApiResponse } from 'next';

import DataBase from '../../lib/db';
import { User } from '../../lib/user';

type Data = {
    message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if(req.method !== 'POST'){
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }
    try {
        const dbInstance = DataBase.getInstance("PGC");

        await dbInstance.initDb<User>(['_uname', '_email'], "Users");

        await dbInstance.removeAllDocuments('Users');
        
        return res.status(201).json({ message: 'DB cleared' });
    } catch (error: any) {
        return res.status(500).json({ message: 'Internal Server Error.' });

    }
}