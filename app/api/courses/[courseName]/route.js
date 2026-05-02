import User from "@/app/lib/model/user.js";
import { dbConnect } from "@/app/lib/mongoDB.js";

export async function GET(req, { params }) {
	let { courseName } = await params;
	await dbConnect();
	courseName = decodeURIComponent(courseName);

	const matched = await User.findOne({ "courses.course_name": courseName.toLowerCase() });

	return Response.json(matched);
}
