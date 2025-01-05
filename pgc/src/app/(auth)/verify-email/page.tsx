"use client"
import { VerifyUserForm } from '../../../components/(auth)/VerifyUserForm';
import React, { useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation';

export default function VerificationPage() {
    console.log("Verification Page");

    const [token, setToken] = useState('');
    const [message, setMessage] = useState('');  
    const searchParams = useSearchParams();
    const email = searchParams?.get('input') || '';
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Attempt to verify:", email);
        console.log(email);
        
        try{
            // Send a GET to query-database API endpoint
            const qParam = `field=${encodeURIComponent("_email")}&value=${encodeURIComponent(email)}&type=${encodeURIComponent("User")}`;
            const response = await fetch(`/api/db/dbserver-GET-obj?${qParam}`, { method: 'GET', headers: { 'Content-Type': 'application/json', } })

            const data = await response.json(); // Parse JSON response
            if (response.ok) {
                setMessage(message); 
                console.log('Email Queried successfully');
            } else {
                console.error('Error:', message);
            }
            const verificationCode: string = data['message']._verificationCode;
            if(token !== verificationCode){
                console.log("Incorrect authentication code, try again");
                return;
            }
            console.log("CORRECT!!!");
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            console.log("Updating user in DB to display verified");

            // Send a PUT to VERIFY-EMAIL API endpoint
            const body = {
                "field": "_email",
                "value": email,
                "collection": "User"
              };
            const verify_response = await fetch('/api/server-auth-verify', { method: 'PUT', headers: {
                'Content-Type': 'application/json', },
              body: JSON.stringify(body), 
            });
            const resp = await verify_response.json(); // Parse the JSON response
            console.log(resp);
    
            if (verify_response.ok) {
              console.log('User verified successfully');
              router.push('/login');
            } else {
              setMessage(message); // Error message from API
              console.error('Error:', message);
            }
        } catch (error) {
            console.error('Unexpected error:', error);
            setMessage('An unexpected error occurred. Please try again.');
        }
    }
    
    return(
        <div style={{ textAlign: "center" }}>
            <h1>Use the verification code sent to: { email }</h1>
            <br />
            < VerifyUserForm
                token={token}
                setTokenAction={setToken}
                onSubmitAction={handleSubmit}
            />
        </div>
    );
}