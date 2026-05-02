"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = ({ params }) => {
	const  { courseId }  = useParams();
	const [users, setUsers] = useState([]);
	const [registeredUser, setRegisteredUser] = useState("");
	const router = useRouter()
	useEffect(() => {
		async function getData() {
			const res = await fetch("http://localhost:3001/users", {});
			const data = await res.json();
			setUsers(data);
			const storedUser = localStorage.getItem("user");
			if (storedUser) {
				setRegisteredUser(JSON.parse(storedUser));
			}
		}
		getData();
	}, []);

	

	return (
		<div>
			<h1>This is the courseId Page.</h1>
			{registeredUser &&
				users.find((user) => {
					return registeredUser.id == user.id;
				}) &&
				registeredUser.courses.find((course) => course.course_name == decodeURIComponent(courseId)) && (
					<div>
						<h1>This is the {decodeURIComponent(courseId)} page details.</h1>
						<p>Course name: {decodeURIComponent(courseId)}</p>
						<div>
							<p>See all lessons:</p>
							<button onClick={handleLessons}>See Your Lessons</button>
						</div>
					</div>
				)}
			{!registeredUser && <h1>Loading...</h1>}
		</div>
	);
};

export default Page;
