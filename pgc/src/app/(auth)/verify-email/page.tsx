"use client"
import { VerifyUserForm } from '../../../components/VerifyUserForm';
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

export default function VerificationPage() {
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
        const userToken = await fetch('/api/query-emailToken', { method: 'POST', headers: {
            'Content-Type': 'application/json', },
            body: email,
    }}}

        if(token !== userToken){
            alert("Incorrect authentication code, try again");
            return
        }

        console.log("New email verified:", email);

        try {
            // Send a POST to VERIFY-EMAIL API endpoint
            const response = await fetch('/api/verify-email', { method: 'POST', headers: {
                'Content-Type': 'application/json', },
              body: token, // Convert the user object to JSON
            });
      
            const data = await response.json(); // Parse the JSON response
            
            if (response.ok) {
              setMessage(data.message); // Success message from API

              console.log('User verified successfully');
            } else {
              setMessage(data.message); // Error message from API
              console.error('Error:', data.message);
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