export async function GET(req) {
    const res = await fetch("http://localhost:3001/users");
    const data = await res.json();
    return Response.json(data);
}