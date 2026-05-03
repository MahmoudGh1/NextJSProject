import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    course_name: String,
    lessons: [String],
});

const userSchema = new mongoose.Schema({
    first_name:  { type: String, required: true },
    last_name:   { type: String, required: true },
    email:       { type: String, required: true, unique: true },
    password:    String,
    gender:      String,
    phoneNumber: String,
    isAdmin:     { type: Boolean, default: false },
    courses:     { type: [courseSchema], default: [] },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;

// https://mongoosejs.com/docs/nextjs.html
