"use client"
import React, { useEffect, useState } from 'react';
import StickyHeadTable from '../components/table';
import { useRouter } from 'next/navigation.js';

const Page = () => {
    const [registeredUser, setRegisteredUser] = useState(null);
    const router = useRouter()
    useEffect(() => {
        async function getData() {
            const res = await fetch("http://localhost:3001/users");
            const data = await res.json();
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                setRegisteredUser(JSON.parse(storedUser));
            }
        }
        getData();
    }, []);

    const handleLessons = (e, course) => {
		router.push(`/courses/${course.course_name}/lessons`)
	}

    return (
        <div>
            <h1>This is the User Dashboard page.</h1>
            <h2>Users List</h2>
            <StickyHeadTable myData={registeredUser}></StickyHeadTable>
            <div>
                <p>See all lessons:</p>
                <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
                    {registeredUser?.courses.map((course) => {
                        return <button style={{width: "fit-content", cursor: "pointer", padding: "12px 24px", backgroundColor: "dodgerblue", borderRadius: "13px", border: "none", outline: "none", color: "white", fontWeight: "bold" }} key={`${registeredUser.id}-${course.course_name}`} onClick={(e) => handleLessons(e, course)}>{`See ${course.course_name} Lessons`}</button>
                    })}
                </div>
            </div>
        </div>
    );
}

export default Page;
