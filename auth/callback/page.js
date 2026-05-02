"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/app/lib/auth-client.js";


const CallbackPage = () => {
    const router = useRouter();

    useEffect(() => {
        async function handleCallback() {
            const { data: session, error } = await authClient.getSession();
            if (!session.user) {
                router.push("/auth/login");
                return;
            }

            const res = await fetch("/api/users");
            const users = await res.json();
            console.log(session.user.email);
            const user = users.find((u) => u.email.toLowerCase() === session.user.email.toLowerCase());

            if (user) {
                localStorage.setItem("user", JSON.stringify(user));
                if(user.isAdmin){
                    router.push("/admindashboard")
                }
                else{
                    router.push("/userdashboard")
                }
            } else {
                router.push("/auth/register");
            }
        }
        handleCallback();
    }, [router]);

    return <div style={{ padding: "40px", textAlign: "center" }}>Logging you in...</div>;
};

export default CallbackPage;