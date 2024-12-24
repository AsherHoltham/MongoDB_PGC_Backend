export const trips = [
    { id: 1, location: "France" },
    { id: 2, location: "London" },
]; // we should use DB instead of in-memory array

export async function GET() {
    return Response.json(trips);
}
export async function POST(request: Request) {
    const trip = await request.json();
    const newTrip = {
        id: trips.length + 1,
        location: trip.location,
    };
    trips.push(newTrip);
    return new Response(JSON.stringify(newTrip), { 
        headers: { "Content-Type": "application/json", },
        status: 201,
    });
}