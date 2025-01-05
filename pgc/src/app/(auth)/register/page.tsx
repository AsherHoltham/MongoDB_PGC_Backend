"use client";
import { RegisterForm } from "../../../components/(auth)/RegisterForm";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { User } from "../../../../lib/documents/user";

export default function RegisterPage() {
    const [uname, setUname] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [fmessages, setMessages] = useState<string[]>([]);
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let newMsgs = fmessages;
        
        const emailQuery = `field=${encodeURIComponent("_email")}&value=${encodeURIComponent(email)}&type=${encodeURIComponent('User')}`;
        const emailRes = await fetch(`/api/db/dbserver-GET-obj?${emailQuery}`);
        const emailData = await emailRes.json();
        if(emailData['message']) newMsgs.push("Email Registered already");

        const unameQuery = `field=${encodeURIComponent("_uname")}&value=${encodeURIComponent(uname)}&type=${encodeURIComponent('User')}`;
        const unameRes = await fetch(`/api/db/dbserver-GET-obj?${unameQuery}`);
        const unameData = await unameRes.json();
        if(unameData['message']) newMsgs.push("Username is taken");

        console.log("back end", newMsgs);
        setMessages(newMsgs);

        if(newMsgs.length !== 0) return;

        const newUser = new User(uname, password, email);
        const userJson = JSON.stringify(newUser.toDB());

        console.log("New user ready to be saved:", userJson);

        try {
            const response = await fetch('/api/server-auth-register', { method: 'POST', headers: {'Content-Type': 'application/json', }, body: userJson, });
            const data = await response.json();
            console.log(data);

            if (response.ok) {
              console.log('User registered successfully');
              router.push(`/verify-email?input=${encodeURIComponent(email)}`);
            } else {
              console.error('Error:', data.message);
            }
        } catch (error) {
          console.error('Unexpected error:', error);
        }
    }

    return (
    <div>
        <main>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                <h1>Sign up</h1>
            </div>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                <RegisterForm       
                uname={uname}
                setUnameAction={setUname}
                email={email}
                setEmailAction={setEmail}
                password={password}
                setPasswordAction={setPassword}
                fmessages={fmessages}
                setMessagesAction={setMessages}
                onSubmitAction={handleSubmit}
                />
            </div>
            <div  className= "text-center">
              <h1>Error List:</h1>
              <ul>
                {fmessages.map((message, index) => (
                  <li key={index}>{message}</li>
                ))}
              </ul>
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