import type { NextApiRequest, NextApiResponse } from 'next';
import DataBase from '../../lib/db';
import { User } from '../../lib/documents/user';
import * as CryptoJS from 'crypto-js';

type Data = {
    message?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) 
{
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
  console.log(req.body);

  const { _uname: uname, _password: password, _email: email } = req.body;

  const hashPassword = CryptoJS.SHA256(password).toString();
  const newUser = new User(uname, hashPassword, email);

  try {
    const dbInstance = DataBase.getInstance("PGC");
    await dbInstance.initDb<User>(['_uname', '_email'], 'User');
    console.log("Create DB instance");

    // USERNAME VERIFIER
    const usernameExists = await dbInstance.documentExists<User>('_uname', newUser.getUname(), 'User');
    if (usernameExists) {
      return res.status(409).json({ message: 'Username already exists.' });
    }
    // EMAIL VERIFIER
    const emailExists = await dbInstance.documentExists<User>('_email', newUser.getEmail(), 'User');
    if (emailExists) {
      return res.status(409).json({ message: 'Email already registered.' });
    }
    console.log("Verification Finished");

    // INSERT USER INTO DB
    await dbInstance.addDocument<User>('User', newUser.toDB());
    console.log("Added New User to DB");

    return res.status(201).json({ message: 'User registered successfully.' });
  } catch (error: any) {
    console.error('Registration Error:', error);
    console.log(error);
    return res.status(500).json({ message: 'Internal Server Error.' });
  }
}