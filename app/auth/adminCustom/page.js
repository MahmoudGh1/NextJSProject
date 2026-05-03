"use client";
import { Box, Button, Chip, FormControl, Input, InputLabel, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const AdminCustom = () => {
	const [users, setUsers] = useState([]);
	const [state, setState] = useState({ email: "", password: "" });
	const router = useRouter();

	useEffect(() => {
		async function getData() {
			const res = await fetch(`${process.env.BASE_URL}/api/users`);
			const data = await res.json();
			setUsers(data);
		}
		getData();
	}, []);

	const handleChange = (event) => {
		setState({ ...state, [event.target.name]: event.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		let user = users.find((user) => user.email == state.email);
		if (user?.isAdmin) {
			return state.email && state.password && router.push("/admindashboard");
		}
		alert("Wrong Email or Password");
	};

	return (
		<Box onSubmit={handleSubmit} component="form" sx={{ display: "flex", flexDirection: "column", alignSelf: "center", gap: 5, margin: "auto 0", width: { sm: "95%", md: "45%" } }}>
			<Typography variant="h2" color="initial" sx={{ textAlign: "center" }}>
				Login Form
			</Typography>
			<TextField required id="Email" name="email" label="Email" value={state.email} onChange={handleChange} />
			<TextField required id="password" name="password" label="Password" value={state.password} onChange={handleChange} />
			<Button type="submit" variant="contained" sx={{ width: { sm: "95%", md: "45%" }, alignSelf: "center" }}>
				Login
			</Button>
		</Box>
	);
};

export default AdminCustom;
