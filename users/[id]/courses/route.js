export async function POST(request, { params }) {
  const { id } = await params;
  const newCourse = await request.json();

  const existingRes = await fetch(`http://localhost:3001/users/${id}`);
  if (!existingRes.ok) return Response.json({ error: "User not found" }, { status: 404 });

  const user = await existingRes.json();

  const alreadyExists = user.courses.some(
    (c) => c.course_name === newCourse.course_name
  );
  if (alreadyExists) {
    return Response.json({ error: "Course already exists for this user" }, { status: 409 });
  }

  user.courses.push(newCourse);

  const res = await fetch(`http://localhost:3001/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  const data = await res.json();
  return Response.json(data, { status: 201 });
}