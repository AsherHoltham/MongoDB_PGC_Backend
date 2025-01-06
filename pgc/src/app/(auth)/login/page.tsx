'use client';

import { LoginForm } from "../../../components/LoginForm";
import { User } from '../../../types';
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const router = useRouter();
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    console.log("Generating JWT Token for user"); // Send a POST to JWT allocator API endpoint

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            // Send a POST request to the API endpoint
            console.log(username, password);
            const qParam = `password=${encodeURIComponent(password)}&username=${encodeURIComponent(username)}&type=${encodeURIComponent("User")}`;

            const response = await fetch(`/api/server-auth-login?${qParam}`, { method: 'GET', headers: {
                'Content-Type': 'application/json', },
            });
            const data = await response.json(); // Parse the JSON response
            console.log(data);

            if (response.ok) {
              setMessage(data.message); // Success message from API
              console.log('User returned successfully');
              //ROUTE USER TO PROFILE PAGE
            } else {
              setMessage(data.message); // Error message from API
              console.error('Error:', data.message);
            }
            const userData = data.message;
            // check if password matches
            if(userData === "incorrect password"){
                console.log('Password is incorrect');
            } // check if verified
            else if(userData._verificationCode !== "__0__"){
                console.log('User has not been verified!');
            } else {
                console.log('User signed in successfully');
            }
            console.log(userData);

            const {_uname, _password, _email, _trips, _verified, _verificationCode} = userData;
            //const user = new User(_uname, _password, _email, _trips, _verified, _verificationCode);
            //console.log("User: ", user);

            ///TODO: CREATE JWT TOKEN

            
            //route user to init profile page
            console.log('Sending user to profile page');
            router.push(`/user-profile?input=${encodeURIComponent(_uname)}`);

          } catch (error) {
            console.error('Unexpected error:', error);
            setMessage('An unexpected error occurred. Please try again.');
          }
    }
    return (
    <div>
        <main>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                <h1>Sign in</h1>
            </div>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                <LoginForm 
                username={username}
                setUsernameAction={setUsername}
                password={password}
                setPasswordAction={setPassword}
                onSubmitAction={handleSubmit}
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