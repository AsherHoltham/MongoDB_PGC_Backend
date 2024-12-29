import Link from "next/link";

export default function ForgotPassword() {
    return (
        <div style={{ textAlign: "center" }}>
            <h1>Email Sent</h1>
            <Link
                href = "/login" 
                className = {"mr-4 text-blue-500"}
                style={{ marginTop: "20px", display: "inline-block" }}
                >
            Back to Login
            </Link>
        </div>
    );
}


/**

"use client"
import { VerifyUserForm } from '../../../components/VerifyUserForm';
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

export default function VerificationPage() {
    console.log("Verification Page");

    const [token, setToken] = useState('');
    const [message, setMessage] = useState('');  
    const [email, setEmail] = useState('');
    const router = useRouter();

    useEffect(() => {
        const savedMessage = localStorage.getItem('verificationMessage');
        if (savedMessage) {
            setEmail(savedMessage);
            localStorage.removeItem('verificationMessage'); // Clean up after use
        }
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Attempt to verify:", email);
        
        try{
            // Send a GET to VERIFY-EMAIL API endpoint
            const db_response = await fetch('/api/query-emailToken', { method: 'GET', headers: {
                'Content-Type': 'application/json', },
                body: email,
            })

            const userToken = await db_response.json(); // Parse the JSON response

            if (db_response.ok) {
                setMessage(message); // Success message from API
                console.log('Email Queried successfully');
              } else {
                console.error('Error:', message);
              }

            if(token !== userToken){
                alert("Incorrect authentication code, try again");
                return;
            }

            // Send a POST to VERIFY-EMAIL API endpoint
            const verify_response = await fetch('/api/verify-email', { method: 'POST', headers: {
                'Content-Type': 'application/json', },
              body: email, // Convert the user object to JSON
            });
      
            const userData = await verify_response.json(); // Parse the JSON response
    
            if (verify_response.ok) {
              console.log('User verified successfully');
            } else {
              setMessage(message); // Error message from API
              console.error('Error:', message);
            }
        } catch (error) {
            console.error('Unexpected error:', error);
            setMessage('An unexpected error occurred. Please try again.');
        }

        // Send a POST to JWT allocator API endpoint


    }


    return(
        <div style={{ textAlign: "center" }}>
            <h1>Check Your Email and use the verification code to verify your account</h1>
            < VerifyUserForm
                token={token}
                setTokenAction={setToken}
                onSubmitAction={handleSubmit}
            />
        </div>
    );
}
*/