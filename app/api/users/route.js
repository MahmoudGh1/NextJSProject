import { dbConnect } from "@/app/lib/mongoDB.js";
import User from "@/app/lib/model/user.js";

export async function GET(req) {
    await dbConnect();
    const users = await User.find({});
    return Response.json(users);
}

export async function POST(req) {
    await dbConnect();
    const body = await req.json();
    const user = await User.insertOne(body);
    return Response.json(user, { status: 201 });
}