"use client";
import { Box, Button, TextField, Typography, Divider } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { authClient } from "@/app/lib/auth-client.js";

const Login = () => {
    const [users, setUsers] = useState([]);
    const [state, setState] = useState({ email: "", password: "" });
    const router = useRouter();

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

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = users.find((user) => user.email === state.email);
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
            if (user.isAdmin) {
                return router.push("/admindashboard");
            }
            return router.push("/userdashboard");
        }
        alert("Wrong Email or Password");
    };

    const signIn = async () => {
        await authClient.signIn.social({
            provider: "github",
            callbackURL: "/auth/callback",
			errorCallbackURL: "/my-app/app/not-found"
        });
    };

    return (
        <Box
            onSubmit={handleSubmit}
            component="form"
            sx={{ display: "flex", flexDirection: "column", alignSelf: "center", gap: 3, margin: "auto 0", width: { sm: "95%", md: "45%" } }}
        >
            <Typography variant="h2" color="initial" sx={{ textAlign: "center" }}>Login Form</Typography>

            <TextField required id="Email" name="email" label="Email" value={state.email} onChange={handleChange} />
            <TextField required id="password" name="password" label="Password" type="password" value={state.password} onChange={handleChange} />
            <Button type="submit" variant="contained" sx={{ width: { sm: "95%", md: "45%" }, alignSelf: "center" }}>Login</Button>

            <Divider>OR</Divider>

            <Button
                onClick={signIn}
                variant="outlined"
                sx={{ width: { sm: "95%", md: "45%" }, alignSelf: "center" }}
            >
                🌖 Sign in with GitHub
            </Button>
        </Box>
    );
};

export default Login;