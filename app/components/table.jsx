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

export default function StickyHeadTable({ myData }) {
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
								<>
									Course
								</>
							) : <div style={{ display: "flex", alignItems: "center", gap: "13px" }}>
									Course
									<input type="text" name="course" onChange={handleChange} />
									<button onClick={handleSearch}>Search</button>
								</div>}
						</TableCell>
						<TableCell style={{ minWidth: "120px" }}>Lessons</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{Array.isArray(myData) && myData.length >= 1 &&
						myData.map((user) =>
							user.courses.map((course) => (
								<TableRow hover key={`${user.id}-${course.course_name}`}>
									<TableCell>{user.first_name}</TableCell>
									<TableCell>{course.course_name}</TableCell>
									<TableCell>{course.lessons.join(", ")}</TableCell>
								</TableRow>
							)),
						)}
					{myData instanceof Object &&
						!Array.isArray(myData) &&
						[myData].map((user) =>
							user.courses.map((course) => (
								<TableRow hover key={`${user.id}-${course.course_name}`}>
									<TableCell>{user.first_name}</TableCell>
									<TableCell>{course.course_name}</TableCell>
									<TableCell>{course.lessons.join(", ")}</TableCell>
								</TableRow>
							)),
						)}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
