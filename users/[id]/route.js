export async function GET(req, { params }) {
  const { id } = await params;
  const res = await fetch(`http://localhost:3001/users/${id}`);

  if (!res.ok) return Response.json({ error: "User not found" }, { status: 404 });

  const data = await res.json();
  return Response.json(data);
}

export async function PUT(req, { params }) {
  const { id } = await params;
  const body = await req.json();

  const existingRes = await fetch(`http://localhost:3001/users/${id}`);
  if (!existingRes.ok) return Response.json({ error: "User not found" }, { status: 404 });

  const existingUser = await existingRes.json();

  const updatedUser = { ...existingUser, ...body };

  const res = await fetch(`http://localhost:3001/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedUser),
  });

  const data = await res.json();
  return Response.json(data);
}

export async function DELETE(req, { params }) {
  const { id } = await params;

  const res = await fetch(`http://localhost:3001/users/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) return Response.json({ error: "Failed to delete" }, { status: 500 });

  return Response.json({ message: "User deleted successfully" });
}