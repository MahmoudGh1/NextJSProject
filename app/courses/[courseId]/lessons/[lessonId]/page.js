"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = ({ params }) => {
    const {lessonId} = useParams()
    const [users, setUsers] = useState([]);
    const [registeredUser, setRegisteredUser] = useState("");
    useEffect(() => {
        async function getData() {
            const res = await fetch(`${process.env.BASE_URL}/api/users`, {});
            const data = await res.json();
            setUsers(data);
            const storedUser = localStorage.getItem("users");
            if (storedUser) {
                setRegisteredUser(JSON.parse(storedUser));
            }
        }
        getData();
    }, []);
    return (
        <div>
            {registeredUser &&
                users.find((user) => {
                    return registeredUser._id == user._id;
                }) &&
                    registeredUser.courses.find((course) => course.lessons.includes(lessonId)) && (
                    <div>
                        <h1>This is the lesson number: {registeredUser.courses.find((course) => course.lessons.includes(lessonId)).lessons.findIndex(lesson => lesson == lessonId)} page details.</h1>
                        <h2>Lesson name: {decodeURIComponent(lessonId)}</h2>
                    </div>
                )}
            {/* {!registeredUser && <h1>Hello World</h1>} */}
            {!registeredUser && <h1>Loading...</h1>}
        </div>
    );
};

export default Page;
