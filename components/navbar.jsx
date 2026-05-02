"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "../lib/auth-client.js";

const Navbar = () => {
	const [loggedUser, setLoggedUser] = useState(null);
	const router = useRouter();

	useEffect(() => {
		async function loadUser() {
			const storedUser = localStorage.getItem("user");
			if (storedUser) {
				setLoggedUser(JSON.parse(storedUser));
			}
		}
		loadUser();
	}, []);

	const handleLogout = async () => {
        localStorage.removeItem("user");
		setLoggedUser(null);
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                router.push("/auth/login"); // redirect to login page
                },
            },
        });		
	};

	return (
		<nav className="navbar navbar-expand-lg bg-body-tertiary">
			<div className="container-fluid">
				<a className="navbar-brand" href="#">
					Navbar
				</a>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<Link className="nav-link active" href="/">
								Home
							</Link>
						</li>

						{loggedUser?.isAdmin && (
							<li className="nav-item">
								<Link className="nav-link" href="/admindashboard">
									Admin Dashboard
								</Link>
							</li>
						)}

						{loggedUser && !loggedUser.isAdmin && (
							<li className="nav-item">
								<Link className="nav-link" href="/userdashboard">
									User Dashboard
								</Link>
							</li>
						)}

						{!loggedUser && (
							<>
								<li className="nav-item">
									<Link className="nav-link" href="/auth/login">
										Login
									</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link" href="/auth/register">
										Register
									</Link>
								</li>
							</>
						)}

						{loggedUser && (
							<li className="nav-item">
								<button className="nav-link btn btn-link" onClick={handleLogout} style={{ cursor: "pointer", color: "red" }}>
									Logout ({loggedUser.first_name})
								</button>
							</li>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
