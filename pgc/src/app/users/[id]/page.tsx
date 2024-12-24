export default async function User({ params } : { params: { id: string } }) {
    const { id } = await params;
    return <h1>User: { id }</h1>;
}