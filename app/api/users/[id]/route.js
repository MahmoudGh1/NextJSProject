import { dbConnect } from "@/app/lib/mongoDB.js";
import User from "@/app/lib/model/user.js";

export async function GET(req, { params }) {
	const { id } = await params;
	await dbConnect();
	const user = await User.findById(id);
	return Response.json(user);
}

export async function PUT(req, { params }) {
	const { id } = await params;
	const body = await req.json();
	await dbConnect();
	const user = await User.findByIdAndUpdate(id, body, { new: true });
	return Response.json(user);
}

export async function DELETE(req, { params }) {
	const { id } = await params;
	await dbConnect();
	await User.findByIdAndDelete(id);
	return Response.json({ message: "User deleted successfully" });
}
