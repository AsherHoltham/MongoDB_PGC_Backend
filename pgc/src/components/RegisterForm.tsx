"use client"

import  '../../styles/auth-pages.css';
import React from "react";

interface RegisterFormProps {
    uname: string;
    setUnameAction: React.Dispatch<React.SetStateAction<string>>;
    email: string;
    setEmailAction: React.Dispatch<React.SetStateAction<string>>;
    password: string;
    setPasswordAction: React.Dispatch<React.SetStateAction<string>>;
    onSubmitAction: (event: React.FormEvent<HTMLFormElement>) => void;
}

export function RegisterForm (
    { uname, setUnameAction, email, setEmailAction,
    password, setPasswordAction, onSubmitAction }: RegisterFormProps ) 
    {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //TODO: push to backend // MAKE THEM MESSAGES

        if(!uname.trim()){
            alert("Username is required")
            return;
        }
        if(!email.trim()){
            alert("Email is required")
            return;
        }
        if(!password.trim()){
            alert("Password is required")
            return;
        }
        if(password.length < 10 || password.length > 25){
            alert("Password must be between 10 and 25 characters")
            return;
        }
        alert("Check your email to verify your account!");

        alert("All good!");

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
                    required  placeholder="Create a Username" ></input>
                </div>
                <div>
                    <label className="form-general">Enter Your Email:</label>
                    <br />
                    <input className="form-general" type="email" id="email" name="email" 
                    value= { email } onChange= { (e) => setEmailAction(e.target.value) } 
                    required  placeholder="Enter Email" autoComplete="email"></input>
                </div>
                <div>
                    <label className="form-general" >Create Password:</label>
                    <br />
                    <input className="form-general" type="text" id="password" name="password" 
                    value= { password } onChange= { (e) => setPasswordAction(e.target.value) } 
                    required  placeholder="Create Password" ></input>
                </div>
                <button className="form-general" 
                type="submit" style={{ marginTop: "2rem" }}>
                sign up</button>
            </form>
        </div>
    );
}