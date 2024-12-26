"use client";
import { RegisterForm } from "../../../components/Register";
import Link from "next/link";
import React, { useState } from "react";
import { User } from "../../../../lib/data/user";

export default function RegisterPage() {
    const [uname, setUname] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

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