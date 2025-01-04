import type { NextApiRequest, NextApiResponse } from 'next';
import DataBase from '../../lib/db';
import { User } from '../../lib/documents/user';
import * as CryptoJS from 'crypto-js';

type Data = {
    message?: Record<string, any> | string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) 
{
    console.log("Attempting to GET data from the database");
    try {
        if (req.method === 'GET') {
            // Extract 'field', 'value', and 'type' from the query parameters
            const { password, username } = req.query;
            console.log(username, password);
            if (!password || !username) {
                return res.status(400).json({ message: 'Missing "Psssword", "username", or "type" query parameter.' });
            }

            const decodedPassword = decodeURIComponent(password as string);
            const decodedUsername = decodeURIComponent(username as string);
            console.log("Password: ", decodedPassword, "Username: ", decodedUsername);
            /// const T = decodedType.slice(0, -1) maybe implement later to univeralize

            // Initialize database instance
            const dbInstance = DataBase.getInstance("PGC");
            await dbInstance.initDb<User>(['_uname', '_email'], 'User');
            console.log("Database instance initialized");

            // Query the database for the user
            const user = await dbInstance.requestDocument<User>('User', '_uname', decodedUsername);
            if (!user) {
                return res.status(404).json({ message: 'User not found.' });
            }
            const result = JSON.stringify(user);
            console.log(result, ": from query");


            const {_uname, _password, _email, _trips, _verified, _verificationCode} = JSON.parse(result);
            
            // check if the password matches
            const hashPassword = CryptoJS.SHA256(decodedPassword).toString();
            if(hashPassword !== _password){
                return res.status(200).json({ message: "incorrect password"});
            } 

            //if password matches
            const retUser = new User(_uname, _password, _email, _trips, _verified, _verificationCode);
            //console.log(_verificationCode);
            return res.status(200).json({ message: retUser.toDB()});
        }
    } catch (error: any) {
        console.error('GET Query Error:', error);
        return res.status(500).json({ message: 'Internal Server Error.' });
    }
}

