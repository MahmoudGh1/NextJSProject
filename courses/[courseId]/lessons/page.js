"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
	const { courseId } = useParams();
	const [lessons, setLessons] = useState([]);
	const [courseName, setCourseName] = useState("");
	const router = useRouter();

	useEffect(() => {
		async function loadLessons() {
			const storedUser = localStorage.getItem("user");
			if (!storedUser) return;

			const user = JSON.parse(storedUser);
			const decoded = decodeURIComponent(courseId);
			const course = user.courses.find((c) => c.course_name == decoded);

			if (course) {
				setCourseName(course.course_name);
				setLessons(course.lessons);
			}
		}
		loadLessons();
	}, [courseId]);

	return (
		<div style={{ padding: "20px" }}>
			<h1>{courseName ? `${courseName} — Lessons` : "Lessons"}</h1>

			{lessons.length === 0 && <p>No lessons found for this course.</p>}

			<ul>
				{lessons.map((lesson, i) => (
					<li key={i} style={{ padding: "8px 0", fontSize: "18px" }}>
						{lesson}
					</li>
				))}
			</ul>

			<button onClick={() => router.back()} style={{ marginTop: "20px", cursor: "pointer", padding: "10px 20px", backgroundColor: "gray", borderRadius: "8px", border: "none", color: "white" }}>
				Back
			</button>
		</div>
	);
};

export default Page;
