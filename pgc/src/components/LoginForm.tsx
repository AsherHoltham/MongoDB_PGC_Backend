"use client"

import React from "react";

interface LoginFormProps {
    username: string;
    setUsernameAction: React.Dispatch<React.SetStateAction<string>>;
    password: string;
    setPasswordAction: React.Dispatch<React.SetStateAction<string>>;
    onSubmitAction: (event: React.FormEvent<HTMLFormElement>) => void;
}

export function LoginForm ( 
    { username, setUsernameAction, password, setPasswordAction, onSubmitAction }: LoginFormProps) 
{
    console.log("Login Form Component")

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!username.trim()){
            alert("Username is required")
            return;
        }
        if(password.length < 10 || password.length > 25){
            alert("Password must be between 10 and 25 characters")
            return;
        }

        /////////Login Server

        console.log("child sees:", username, password);
        onSubmitAction(e);
    }
    
    return (
        <div>
            <form>
                <label>Enter your Username:</label>
                <br />
                <input type="text" id="username" name="username" required  placeholder="Enter username" ></input>
            </form>
            <form>
                <label>Enter your Password:</label>
                <br />
                <input type="text" id="password" name="password" required  placeholder="Enter password" ></input>
            </form>
        </div>
    );
}