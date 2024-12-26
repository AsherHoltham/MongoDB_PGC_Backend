"use client"

import React from "react";

interface RegisterFormProps {
    uname: string;
    setUnameAction: React.Dispatch<React.SetStateAction<string>>;
    email: string;
    setEmailAction: React.Dispatch<React.SetStateAction<string>>;
    password: string;
    setPasswordAction: React.Dispatch<React.SetStateAction<string>>;
}

export function RegisterForm (
    { uname, setUnameAction, email, setEmailAction,
    password, setPasswordAction }: RegisterFormProps ) 
    {

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if(!uname.trim){
            alert("Username is required")
            return;
        }

        if(!email.trim){
            alert("Email is required")
            return;
        }

        if(!password.trim){
            alert("Password is required")
            return;
        }

        alert("Check your email to verify your account!");
        console.log(uname);
        console.log(email);
        console.log(password);
    }

    console.log("USER INIT Form Component")
    return (
        <div>
            <form onSubmit={ handleSubmit } method="GET">
                <div>
                    <label>Create a Username:</label>
                    <br />
                    <input type="text" id="uname" name="uname" 
                    value= { uname } onChange= { (e) => setUnameAction(e.target.value) } 
                    required  placeholder="Create a Username" ></input>
                </div>
                <div>
                    <label>Enter Your Email:</label>
                    <br />
                    <input type="email" id="email" name="email" 
                    value= { email } onChange= { (e) => setEmailAction(e.target.value) } 
                    required  placeholder="Enter Email" ></input>
                </div>
                <div>
                    <label>Create Password:</label>
                    <br />
                    <input type="text" id="password" name="password" 
                    value= { password } onChange= { (e) => setPasswordAction(e.target.value) } 
                    required  placeholder="Create Password" ></input>
                </div>
                <button className="bg-blue-500 text-white py-2 px-4 rounded-md" 
                type="submit" style={{ marginTop: "2rem" }}>
                Submit</button>
            </form>

        </div>
    );
}