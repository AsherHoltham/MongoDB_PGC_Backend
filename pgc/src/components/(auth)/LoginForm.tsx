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

        //TODO: push to backend // MAKE THEM MESSAGES

        if(!username.trim()){
            alert("Username is required")
            return;
        }
        if(password.length < 10 || password.length > 25){
            alert("Password must be between 10 and 25 characters")
            return;
        }
        
        console.log("child sees:", username, password);
        onSubmitAction(e);
    }
    
    return (
        <div>
            <form className="form-general" onSubmit={ handleSubmit } method="GET">
                <div>
                    <label className="form-general">Enter your Username:</label>
                    <br />
                    <input className="form-general" type="text" id="uname" name="uname" 
                    value= { username } onChange= { (e) => setUsernameAction(e.target.value) } 
                    required  placeholder="Create a Username" ></input>
                </div>
                <div>
                    <label className="form-general" >Enter your Password:</label>
                    <br />
                    <input className="form-general" type="text" id="password" name="password" 
                    value= { password } onChange= { (e) => setPasswordAction(e.target.value) } 
                    required  placeholder="Create Password" ></input>
                </div>
                <button className="form-general" 
                type="submit" style={{ marginTop: "2rem" }}>
                sign in</button>
            </form>
        </div>
    );
}