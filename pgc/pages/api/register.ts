import type { NextApiRequest, NextApiResponse } from 'next';
import DataBase from '../../lib/db';
import { User } from '../../lib/user';

type Data = {
    message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) 
{
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  const { uname, email, password, trips } = req.body;
  const newUser = new User(uname, password, email, trips);
  console.log("checkpoint_ADDEDTODB");
  try {
    const dbInstance = DataBase.getInstance("PGC");
    await dbInstance.initDb<User>(['_uname', '_email'], "Users");

    // CHECK IF GIVEN INDEXES EXIST
    const usernameExists = await dbInstance.documentExists<User>('_uname', newUser.getUname(), 'Users');
    if (usernameExists) {
      return res.status(409).json({ message: 'Username already exists.' });
    }
    const emailExists = await dbInstance.documentExists<User>('_email', newUser.getEmail(), 'Users');
    if (emailExists) {
      return res.status(409).json({ message: 'Email already registered.' });
    }
    console.log("checkpoint_ADDEDTODB");
    // INSERT
    const user = new User(uname, password, email, trips);
    await dbInstance.addDocument<User>("Users", user.toDB());
    console.log("checkpoint_ADDEDTODB");

    return res.status(201).json({ message: 'User registered successfully.' });
  } catch (error: any) {
    console.error('Registration Error:', error);
    console.log(error);
    return res.status(500).json({ message: 'Internal Server Error.' });
  }
}