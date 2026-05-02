"use client";
import React, { useEffect, useState } from "react";
import StickyHeadTable from "../components/table";

const Page = () => {
	const [myData, setMyData] = useState(null);
	const [editUser, setEditUser] = useState(null);
	const [addCourseUser, setAddCourseUser] = useState(null);
	const [newCourse, setNewCourse] = useState({ course_name: "", lessons: "" });

	async function refreshData() {
		const res = await fetch("/api/users");
		const data = await res.json();
		setMyData(data);
	}

	useEffect(() => {
		async function getData() {
			const res = await fetch("/api/users");
			const data = await res.json();
			setMyData(data);
		}
		getData();
	}, []);

	async function handleDeleteUser(id) {
        const check = confirm("Are you sure you want to delete this user?")
		if (!check) return;
		await fetch(`/api/users/${id}`, { method: "DELETE" });
		refreshData();
	}

	function handleEditClick(user) {
		setEditUser({ ...user });
	}

	async function handleEditSubmit() {
		const { id, courses, ...userData } = editUser;
		await fetch(`/api/users/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(userData),
		});
		setEditUser(null);
		refreshData();
	}

	async function handleAddCourse() {
		const course = {
			course_name: newCourse.course_name,
			lessons: newCourse.lessons.split(",").map((lesson) => lesson.trim()),
		};
		await fetch(`/api/users/${addCourseUser.id}/courses`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(course),
		});
		setAddCourseUser(null);
		setNewCourse({ course_name: "", lessons: "" });
		refreshData();
	}

	async function handleDeleteCourse(userId, courseName) {
        const check = confirm(`Delete course "${courseName}"?`)
		if (!check) return;
		await fetch(`/api/users/${userId}/courses/${encodeURIComponent(courseName)}`, {
			method: "DELETE",
		});
		refreshData();
	}

	return (
		<div style={{ padding: "20px" }}>
			<h1>Admin Dashboard</h1>
			<h2>Users List</h2>

			<StickyHeadTable myData={myData} onEdit={handleEditClick} onDelete={handleDeleteUser} onDeleteCourse={handleDeleteCourse} onAdd={setAddCourseUser} />

			{editUser && (
				<div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0,0,0,0.62)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999 }}>
					<div style={{ background: "white", padding: "20px", borderRadius: "8px", minWidth: "300px", boxShadow: "0 2px 12px rgba(0,0,0,0.2)" }}>
						<h3>Edit User — {editUser.first_name}</h3>
						{["first_name", "last_name", "email", "password", "gender"].map((field) => (
							<input key={field} placeholder={field} value={editUser[field] || ""} onChange={(e) => setEditUser({ ...editUser, [field]: e.target.value })} style={{ display: "block", marginBottom: "8px", padding: "6px", width: "100%" }} />
						))}
						<label>
							<input type="checkbox" checked={editUser.isAdmin} onChange={(e) => setEditUser({ ...editUser, isAdmin: e.target.checked })} /> Is Admin
						</label>
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
				<div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0,0,0,0.62)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999 }}>
					<div style={{ background: "white", padding: "20px", borderRadius: "8px", minWidth: "300px", boxShadow: "0 2px 12px rgba(0,0,0,0.2)" }}>
						<h3>Add Course to {addCourseUser.first_name}</h3>
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
