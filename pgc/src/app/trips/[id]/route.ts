import { trips } from "../route"; //dynamic route handler

export async function GET(request: Request, 
    { params }: { params: { "id": string } }
) {
    const { id } = await params;
    const trip = trips.find((trip) => trip.id === parseInt(id));
    return Response.json(trip);
}