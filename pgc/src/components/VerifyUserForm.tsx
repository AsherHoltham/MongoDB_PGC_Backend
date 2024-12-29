"use client"

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
            <form onSubmit={ handleSubmit } method="GET">
                <div>
                    <label>Input your Code:</label>
                    <br />
                    <input type="text" id="token" name="token" 
                    value= { token } onChange= { (e) => setTokenAction(e.target.value) } 
                    required  placeholder="Input Verification Code" ></input>
                </div>
                <button className="bg-blue-500 text-white py-2 px-4 rounded-md" 
                type="submit" style={{ marginTop: "2rem" }}>
                Submit</button>
            </form>
        </div>
    );
}
