"use client"

import React from "react";

interface VerifyUserFormProps{
    token: string;
    setTokenAction: React.Dispatch<React.SetStateAction<string>>;
}

export function VerifyUserForm( { token, setTokenAction }: VerifyUserFormProps ) {
    console.log("Verify Form Component");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

    }

    return (
        <div>
            <form onSubmit={ handleSubmit } method="GET">
                <div>
                    <label>Input your Username:</label>
                    <br />
                    <input type="text" id="token" name="token" 
                    value= { token } onChange= { (e) => setTokenAction(e.target.value) } 
                    required  placeholder="Create a Username" ></input>
                </div>
                <button className="bg-blue-500 text-white py-2 px-4 rounded-md" 
                type="submit" style={{ marginTop: "2rem" }}>
                Submit</button>
            </form>
        </div>
    );
}
