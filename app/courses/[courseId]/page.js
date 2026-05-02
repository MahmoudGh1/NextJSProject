"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
    const { courseId } = useParams();
    const [users, setUsers] = useState([]);
    const [registeredUser, setRegisteredUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        async function getData() {
            const res = await fetch("/api/users");
            const data = await res.json();
            setUsers(data);
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                setRegisteredUser(JSON.parse(storedUser));
            }
        }
        getData();
    }, []);

    function handleLessons() {
        router.push(`/courses/${courseId}/lessons`);
    }

    const decodedCourse = decodeURIComponent(courseId);

    const userExistsInDB = registeredUser && users.find((u) => u._id == registeredUser._id);
    const userHasCourse = registeredUser?.courses.find((c) => c.course_name == decodedCourse);

    return (
        <div style={{ padding: "20px" }}>
            <h1>Course Details</h1>

            {!registeredUser && <h2>Loading...</h2>}

            {registeredUser && !userExistsInDB && <h2>User not found.</h2>}

            {registeredUser && userExistsInDB && !userHasCourse && (
                <h2>You are not enrolled in this {decodedCourse} course!</h2>
            )}

            {registeredUser && userExistsInDB && userHasCourse && (
                <div>
                    <h2>{decodedCourse}</h2>
                    <p>Course name: {decodedCourse}</p>
                    <div style={{ marginTop: "12px", display: "flex", alignItems: "center", gap: "15px", border: "1px solid blue" }}>
                        <p style={{height: "100%", border: "1px solid yellow"}}>See all lessons:</p>
                        <button
                            onClick={handleLessons}
                            style={{ cursor: "pointer", padding: "12px 24px", backgroundColor: "dodgerblue", borderRadius: "13px", border: "none", color: "white", fontWeight: "bold" }}
                        >
                            See Your Lessons
                        </button>
						<button
                            onClick={() => router.back()}
                            style={{ cursor: "pointer", padding: "12px 24px", backgroundColor: "gray", borderRadius: "13px", border: "none", color: "white", fontWeight: "bold" }}
                        >
                            Back
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Page;