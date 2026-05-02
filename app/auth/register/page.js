"use client";
import { Box, Button, Chip, FormControl, Input, InputLabel, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";


const Register = () => {
    const [users, setUsers] = useState([]);
    const [state, setState] = useState({ first_name: "", last_name: "", email: "", password: "", gender: "", phoneNumber: "", isAdmin: false, courses: [] });
    const router = useRouter()

    useEffect(() => {
        async function getData() {
            const res = await fetch("/api/users");
            const data = await res.json();
            setUsers(data);
        }
        getData();
    }, []);

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await fetch("/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(state)
        });
        localStorage.setItem("user", JSON.stringify(state))
        state.email && state.password && router.push("/auth/login")
    }

    return (
        <Box onSubmit={handleSubmit} component="form" sx={{ display: "flex", flexDirection: "column", alignSelf: "center", gap: 3, margin: "auto 0", width: { sm: "95%", md: "45%" } }}>
            <Typography variant="h2" color="initial" sx={{textAlign: "center"}}>Registration Form</Typography>
            <TextField required id="first_name" name="first_name" label="First Name" value={state.first_name} onChange={handleChange} />
            <TextField required id="last_name" name="last_name" label="Last Name" value={state.last_name} onChange={handleChange} />
            <TextField required id="Email" name="email" label="Email" value={state.email} onChange={handleChange} />
            <TextField required id="password" name="password" label="Password" value={state.password} onChange={handleChange} />
            <TextField required id="gender" name="gender" label="Gender" value={state.gender} onChange={handleChange} />
            <TextField required id="phoneNumber" name="phoneNumber" label="Phone Number" value={state.phoneNumber} onChange={handleChange} />
            <Button type="submit" variant="contained" sx={ {width: { sm: "95%", md: "45%" }, alignSelf: "center" }}>Register</Button>
        </Box>
    );
}

export default Register;
