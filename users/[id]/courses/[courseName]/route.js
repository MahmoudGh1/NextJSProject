export async function PUT(request, { params }) {
	const { id, courseName } = await params;
	const updatedCourse = await request.json();

	const existingRes = await fetch(`http://localhost:3001/users/${id}`);
	if (!existingRes.ok) return Response.json({ error: "User not found" }, { status: 404 });

	const user = await existingRes.json();

	const courseIndex = user.courses.findIndex((c) => c.course_name === decodeURIComponent(courseName));
	if (courseIndex === -1) return Response.json({ error: "Course not found" }, { status: 404 });

	user.courses[courseIndex] = updatedCourse;

	const res = await fetch(`http://localhost:3001/users/${id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(user),
	});

	const data = await res.json();
	return Response.json(data);
}

export async function DELETE(request, { params }) {
	const { id, courseName } = await params;

	const existingRes = await fetch(`http://localhost:3001/users/${id}`);
	if (!existingRes.ok) return Response.json({ error: "User not found" }, { status: 404 });

	const user = await existingRes.json();

	const filteredCourses = user.courses.filter((c) => c.course_name !== courseName);

	if (filteredCourses.length === user.courses.length) {
		return Response.json({ error: "Course not found" }, { status: 404 });
	}

	user.courses = filteredCourses;

	const res = await fetch(`http://localhost:3001/users/${id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(user),
	});

	const data = await res.json();
	return Response.json(data);
}
