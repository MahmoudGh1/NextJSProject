"use client";
import React, { useEffect, useState } from "react";
import StickyHeadTable from "../components/table";
import { useRouter } from "next/navigation";

const Page = () => {
	const [registeredUser, setRegisteredUser] = useState(null);
	const [editUser, setEditUser] = useState(null);
	const [addCourseUser, setAddCourseUser] = useState(null);
	const [newCourse, setNewCourse] = useState({ course_name: "", lessons: "" });
	const router = useRouter();

	useEffect(() => {
		async function loadUser() {
			const storedUser = localStorage.getItem("user");
			if (storedUser) {
				setRegisteredUser(JSON.parse(storedUser));
			}
		}
		loadUser();
	}, []);

	async function refreshUser(id) {
		const res = await fetch(`/api/users/${id}`);
		const updated = await res.json();
		localStorage.setItem("user", JSON.stringify(updated));
		setRegisteredUser(updated);
	}

	const handleLessons = (course) => {
		router.push(`/courses/${encodeURIComponent(course.course_name)}/lessons`);
	};

	async function handleEditSubmit() {
		const { id, courses, ...userData } = editUser;
		await fetch(`/api/users/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(userData),
		});
		setEditUser(null);
		refreshUser(id);
	}

	async function handleDeleteCourse(userId, courseName) {
		const check = confirm(`Delete course "${courseName}"?`)
		if (!check) return;
		await fetch(`/api/users/${userId}/courses/${encodeURIComponent(courseName)}`, {
			method: "DELETE",
		});
		refreshUser(userId);
	}

	async function handleAddCourse() {
		const course = {
			course_name: newCourse.course_name,
			lessons: newCourse.lessons.split(",").map((lesson) => lesson.trim())};
		await fetch(`/api/users/${addCourseUser._id}/courses`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(course),
		});
		setAddCourseUser(null);
		setNewCourse({ course_name: "", lessons: "" });
		refreshUser(addCourseUser._id);
	}

	return (
		<div style={{ padding: "20px" }}>
			<h1>User Dashboard</h1>

			<StickyHeadTable myData={registeredUser} onEdit={(user) => setEditUser({ ...user })} onDeleteCourse={handleDeleteCourse} onAdd={setAddCourseUser} />

			<div style={{ marginTop: "20px" }}>
				<p>See all lessons:</p>
				<div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
					{registeredUser?.courses.map((course) => (
						<button key={`${registeredUser._id}-${course.course_name}`} onClick={() => handleLessons(course)} style={{ width: "fit-content", cursor: "pointer", padding: "12px 24px", backgroundColor: "dodgerblue", borderRadius: "13px", border: "none", color: "white", fontWeight: "bold" }}>
							{`See ${course.course_name} Lessons`}
						</button>
					))}
				</div>
			</div>

			{editUser && (
				<div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", backgroundColor: "rgba(0, 0, 0, 0.62)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999 }}>
					<div style={{ background: "white", padding: "20px", borderRadius: "8px", minWidth: "300px", boxShadow: "0 2px 12px black" }}>
						<h3>Edit Your Info</h3>
						{["first_name", "last_name", "email", "password", "gender"].map((field) => (
							<input key={field} placeholder={field} value={editUser[field] || ""} onChange={(e) => setEditUser({ ...editUser, [field]: e.target.value })} style={{ display: "block", marginBottom: "8px", padding: "6px", width: "100%" }} />
						))}
						<button onClick={handleEditSubmit} style={{ marginTop: "30px", backgroundColor: "blue", color: "white", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer", marginRight: "8px" }}>
							Save
						</button>
						<button onClick={() => setEditUser(null)} style={{ backgroundColor: "gray", color: "white", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer" }}>
							Cancel
						</button>
					</div>
				</div>
			)}

			{addCourseUser && (
				<div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", backgroundColor: "rgba(0, 0, 0, 0.62)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999 }}>
					<div style={{ background: "white", padding: "20px", borderRadius: "8px", minWidth: "300px", boxShadow: "0 2px 12px rgba(0,0,0,0.2)" }}>
						<h3>Add a New Course</h3>
						<input placeholder="Course name" value={newCourse.course_name} onChange={(e) => setNewCourse({ ...newCourse, course_name: e.target.value })} style={{ display: "block", marginBottom: "8px", padding: "6px", width: "100%" }} />
						<input placeholder="Lessons (comma separated)" value={newCourse.lessons} onChange={(e) => setNewCourse({ ...newCourse, lessons: e.target.value })} style={{ display: "block", marginBottom: "8px", padding: "6px", width: "100%" }} />
						<button onClick={handleAddCourse} style={{ backgroundColor: "orange", color: "white", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer", marginRight: "8px" }}>
							Add
						</button>
						<button onClick={() => setAddCourseUser(null)} style={{ backgroundColor: "gray", color: "white", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer" }}>
							Cancel
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default Page;
