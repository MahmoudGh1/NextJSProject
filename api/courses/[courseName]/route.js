export async function GET(request, { params }) {
  const { courseName } = await params;

  const res = await fetch("http://localhost:3001/users");
  if (!res.ok) return Response.json({ error: "Failed to fetch users" }, { status: 500 });

  const users = await res.json();

  const matched = users.filter((user) =>
    user.courses.some(
      (c) => c.course_name.toLowerCase() === decodeURIComponent(courseName).toLowerCase()
    )
  );

  if (matched.length === 0) {
    return Response.json({ error: "No users found for this course" }, { status: 404 });
  }

  return Response.json(matched);
}
