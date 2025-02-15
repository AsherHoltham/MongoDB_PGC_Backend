"use client"

import  '../../../styles/auth-pages.css';
import React from "react";

interface RegisterFormProps {
    uname: string;
    setUnameAction: React.Dispatch<React.SetStateAction<string>>;
    email: string;
    setEmailAction: React.Dispatch<React.SetStateAction<string>>;
    password: string;
    setPasswordAction: React.Dispatch<React.SetStateAction<string>>;
    fmessages: string[];
    setMessagesAction: React.Dispatch<React.SetStateAction<string[]>>;
    onSubmitAction: (event: React.FormEvent<HTMLFormElement>) => void;
}

export function RegisterForm ( { uname, setUnameAction, email, setEmailAction, password, setPasswordAction, fmessages, setMessagesAction, onSubmitAction }: RegisterFormProps ) 
{
    let messages: string[] = [];
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        messages = [];

        if(!uname.trim()) messages.push("Username is required");
        if(!email.trim()) messages.push("Email is required");
        if(!password.trim()) messages.push("Password is required");
        if(password.length < 10 || password.length > 25) messages.push("Password must be between 10 and 25 characters");

        console.log("front end", messages);
        if(messages.length !== 0){
            setMessagesAction(messages);
            return;
        }
        console.log("child sees:", uname, email, password);
        onSubmitAction(e);
    }

    console.log("Resgister Form Component")
    return (
        <div>
            <form className="form-general" onSubmit={ handleSubmit } method="GET">
                <div>
                    <label className="form-general">Create a Username:</label>
                    <br />
                    <input className="form-general" type="text" id="uname" name="uname" 
                    value= { uname } onChange= { (e) => setUnameAction(e.target.value) } 
                    placeholder="Create a Username" ></input>
                </div>
                <div>
                    <label className="form-general">Enter Your Email:</label>
                    <br />
                    <input className="form-general" type="email" id="email" name="email" 
                    value= { email } onChange= { (e) => setEmailAction(e.target.value) } 
                    placeholder="Enter Email" autoComplete="email"></input>
                </div>
                <div>
                    <label className="form-general" >Create Password:</label>
                    <br />
                    <input className="form-general" type="text" id="password" name="password" 
                    value= { password } onChange= { (e) => setPasswordAction(e.target.value) } 
                    placeholder="Create Password" ></input>
                </div>
                <button className="form-general" 
                type="submit" style={{ marginTop: "2rem" }}>
                sign up</button>
            </form>
        </div>
    );
}