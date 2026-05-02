import { dbConnect } from "@/app/lib/mongoDB.js";
import User from "@/app/lib/models/User";

export async function POST(req, { params }) {
	const { id } = await params;
	const newCourse = await req.json();
	await dbConnect();
	const user = await User.findById(id);

	const alreadyExists = user.courses.some((course) => course.course_name === newCourse.course_name);
	if (alreadyExists) {
		return Response.json({ error: "Course already exists" }, { status: 403 });
	}

	user.courses.push(newCourse);
	await user.save();
	return Response.json(user, { status: 201 });
}
