"use client";
import { RegisterForm } from "../../../components/Register";
import Link from "next/link";
import React, { useState } from "react";
import { User } from "../../../../lib/user";

export default function RegisterPage() {
    const [uname, setUname] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const newUser = new User(uname, password, email, []);
        const userJson = newUser.toDB();
        const key = newUser.retUname();

        console.log("New user ready to be saved:", userJson, key);
    }

    return (
    <div>
        <main>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                <h1>Sign Up Page</h1>
            </div>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                <RegisterForm       
                uname={uname}
                setUnameAction={setUname}
                email={email}
                setEmailAction={setEmail}
                password={password}
                setPasswordAction={setPassword}
                onSubmitAction={handleSubmit}
                />
            </div>
            <div style={{ textAlign: "center" }}>
                <Link
                    href = "/login" 
                    className = {"mr-4 text-blue-500"}
                    >
                        I have an Account
                </Link>
            </div>
        </main>
    </div>
    );
}