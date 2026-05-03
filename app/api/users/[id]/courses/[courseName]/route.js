import { dbConnect } from "@/app/lib/mongoDB.js";
import User from "@/app/lib/model/user.js";

export async function PUT(req, { params }) {
	let { id, courseName } = await params;
    const updatedCourse = await req.json();
    await dbConnect();
    courseName = decodeURIComponent(courseName);
    const user = await User.findById(id);

    const courseIndex = user.courses.findIndex((course) => course.course_name === courseName);

    user.courses[courseIndex] = updatedCourse;
    await user.save();
    return Response.json(user);
}

export async function DELETE(req, { params }) {
	let { id, courseName } = await params;
    await dbConnect();
    courseName = decodeURIComponent(courseName);
    const user = await User.findById(id);

    user.courses = user.courses.filter((course) => course.course_name !== courseName);
    await user.save();
    return Response.json(user);
}
