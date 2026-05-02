import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
	course_name: String,
	lessons: [String],
});

const UserSchema = new mongoose.Schema(
	{
		first_name: { type: String, required: true },
		last_name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: String,
		gender: String,
		phoneNumber: String,
		isAdmin: { type: Boolean, default: false },
		courses: { type: [CourseSchema], default: [] },
	},
	{ timestamps: true },
);

export default mongoose.models.User || mongoose.model("User", UserSchema);

// https://mongoosejs.com/docs/nextjs.html
