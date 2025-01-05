"use client"

import  '../../../styles/auth-pages.css';
import React from "react";

interface VerifyUserFormProps{
    token: string;
    setTokenAction: React.Dispatch<React.SetStateAction<string>>;
    onSubmitAction: (event: React.FormEvent<HTMLFormElement>) => void;
}

export function VerifyUserForm( { token, setTokenAction, onSubmitAction }: VerifyUserFormProps ) {
    console.log("Verify Form Component");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //TODO: push to backend // MAKE THEM MESSAGES
        
        if(token.length !== 6){
            alert("Verification code must be 6 characters");
            return
        }

        alert("All good!");

        console.log("child sees:", token);
        onSubmitAction(e);
    }

    return (
        <div>
            <form className="form-general" onSubmit={ handleSubmit } method="GET">
                <div>
                    <label className="form-general" >Enter your Verification Code:</label>
                    <br />
                    <input className="form-general" type="text" id="token" name="token" 
                    value= { token } onChange= { (e) => setTokenAction(e.target.value) } 
                    required  placeholder="Input Verification Code" ></input>
                </div>
                <button className="form-general" 
                type="submit" style={{ marginTop: "2rem" }}>
                Verify</button>
            </form>
        </div>
    );
}
