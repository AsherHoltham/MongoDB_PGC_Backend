/**

'use client';

import { LoginForm } from "../../../components/LoginForm";
import Link from "next/link";
import React, { useState } from "react";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    console.log("Generating JWT Token for user");

    // Send a POST to JWT allocator API endpoint

    
    return (
    <div>
        <main>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                <h1>Login Page</h1>
            </div>

            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                <LoginForm 
                username={username},

                password={password},

                />
            </div>


            <div style={{ textAlign: "center" }}>
                <Link
                    href = "/register" 
                    className = {"mr-4 text-blue-500"}
                    >
                        Create Account
                </Link>
            </div>
            <div style={{ textAlign: "center" }}>
                <Link
                    href = "/forgot-password" 
                    className = {"mr-4 text-blue-500"}
                    >
                        Forgot Password
                </Link>
            </div>
        </main>
    </div>
    );
}
*/