"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import Table from "@mui/material/Table";
import Link from "next/link";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export default function StickyHeadTable({ myData, onEdit, onDelete, onDeleteCourse, onAdd }) {
	const [state, setState] = React.useState({ course: "", id: "" });
	const router = useRouter();

	const handleChange = (e) => {
		setState({ ...state, [e.target.name]: e.target.value });
	};

	const handleSearch = (e) => {
		router.push(`/courses/${state.course}`);
	};
	return (
		<TableContainer sx={{ maxHeight: "100%" }}>
			<Table stickyHeader aria-label="sticky table">
				<caption>&copy; 2026 ITI. All Rights Reserved.</caption>
				<TableHead>
					<TableRow>
						<TableCell style={{ minWidth: "120px" }}>Student Name</TableCell>
						<TableCell>
							{Array.isArray(myData) ? (
								<>Course</>
							) : (
								<div style={{ display: "flex", alignItems: "center", gap: "13px" }}>
									Course
									<input type="text" name="course" onChange={handleChange} />
									<button onClick={handleSearch}>Search</button>
								</div>
							)}
						</TableCell>
						<TableCell style={{ minWidth: "120px" }}>Lessons</TableCell>
						<TableCell style={{ minWidth: "120px" }}>Actions</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{Array.isArray(myData) &&
						myData.length >= 1 &&
						myData.map((user) =>
							user.courses.map((course) => (
								<TableRow hover key={`${user._id}-${course.course_name}`}>
									<TableCell>{user.first_name}</TableCell>
									<TableCell>{course.course_name}</TableCell>
									<TableCell>{course.lessons.join(", ")}</TableCell>
									{(onEdit || onDelete) && (
										<TableCell>
											<div style={{ display: "flex", gap: "10px" }}>
												{onEdit && (
													<button onClick={() => onEdit(user)} style={{ backgroundColor: "blue", color: "white", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer" }}>
														Edit
													</button>
												)}
												{onDelete && (
													<button onClick={() => onDelete(user._id)} style={{ backgroundColor: "red", color: "white", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer" }}>
														Delete
													</button>
												)}
												{onDeleteCourse && (
													<button onClick={() => onDeleteCourse(user._id, course.course_name)} style={{ backgroundColor: "purple", color: "white", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer" }}>
														Delete Course
													</button>
												)}
												{onAdd && (
													<button onClick={() => onAdd(user)} style={{ backgroundColor: "green", color: "white", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer" }}>
														+ Course
													</button>
												)}
											</div>
										</TableCell>
									)}
								</TableRow>
							)),
						)}
					{myData instanceof Object &&
						!Array.isArray(myData) &&
						[myData].map((user) =>
							user.courses.map((course) => (
								<TableRow hover key={`${user._id}-${course.course_name}`}>
									<TableCell>{user.first_name}</TableCell>
									<TableCell>{course.course_name}</TableCell>
									<TableCell>{course.lessons.join(", ")}</TableCell>
									{(onEdit || onDeleteCourse || onAdd) && (
										<TableCell>
											<div style={{ display: "flex", gap: "10px" }}>
												{onEdit && (
													<button onClick={() => onEdit(user)} style={{ backgroundColor: "blue", color: "white", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer" }}>
														Edit
													</button>
												)}
												{onDeleteCourse && (
													<button onClick={() => onDeleteCourse(user._id, course.course_name)} style={{ backgroundColor: "red", color: "white", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer" }}>
														Delete Course
													</button>
												)}
												{onAdd && (
													<button onClick={() => onAdd(user)} style={{ backgroundColor: "orange", color: "white", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer" }}>
														+ Course
													</button>
												)}
											</div>
										</TableCell>
									)}
								</TableRow>
							)),
						)}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
