import type { NextApiRequest, NextApiResponse } from 'next';
import DataBase from '../../lib/db';
import { User } from '../../lib/user';

type Data = {
    message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) 
{

}

/**
 * const queryParam = 'some value with spaces & special characters';

// Encode the query parameter
const encodedQueryParam = encodeURIComponent(queryParam);

// Send it via fetch
const db_response = await fetch(`/api/query-database?query=${encodedQueryParam}`, { method: 'GET', headers: { 'Content-Type': 'application/json', } })
 */