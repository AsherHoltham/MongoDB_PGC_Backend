import type { NextApiRequest, NextApiResponse } from 'next';
import DataBase from '../../lib/db';
import { User } from '../../lib/user';

type Data = {
    message: string;
    data?: any;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    console.log("Attempting to request data from the database");
    try {
        // Validate HTTP method
        if (req.method !== 'GET') {
            return res.status(405).json({ message: 'Method Not Allowed. Only GET is supported.' });
        }

        // Extract 'field', 'value', and 'type' from the query parameters
        const { field, value, type } = req.query;

        if (!field || !value || !type) {
            return res.status(400).json({ message: 'Missing "field", "value", or "type" query parameter.' });
        }

        const decodedField = decodeURIComponent(field as string);
        const decodedValue = decodeURIComponent(value as string);
        const decodedType = decodeURIComponent(type as string);

        console.log("Field: ", decodedField, "Value: ", decodedValue, "Type: ", decodedType);
        /// const T = decodedType.slice(0, -1) maybe implement later to univeralize

        // Initialize database instance
        const dbInstance = DataBase.getInstance("PGC");
        await dbInstance.initDb<User>(['_uname', '_email'], "Users");

        console.log("Database instance initialized");

        // Query the database for the user
        const newUser = await dbInstance.requestDocument<User>("Users", decodedField, decodedValue);

        if (!newUser) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const result = JSON.stringify(newUser);

        console.log(result, ": from query");

        // Respond with the user data and verification code
        return res.status(200).json({
            message: 'User retrieved successfully.',
            data: {
                result,
            },
        });

    } catch (error: any) {
        console.error('Query Error:', error);
        return res.status(500).json({ message: 'Internal Server Error.' });
    }
}

/**
 * FORMAT FOR PACKAGING A QUERY
 * const queryParam = 'some value with spaces & special characters';

// Encode the query parameter
const encodedQueryParam = encodeURIComponent(queryParam);

// Send it via fetch
const db_response = await fetch(`/api/query-database?query=${encodedQueryParam}`, { method: 'GET', headers: { 'Content-Type': 'application/json', } })
 */