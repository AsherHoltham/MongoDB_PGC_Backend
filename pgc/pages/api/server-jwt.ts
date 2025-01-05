import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
    message?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) 
{

}