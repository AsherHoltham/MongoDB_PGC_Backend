"use client"

import React, { useState } from 'react';

export function ClearDataBaseButton(){
    // State variables to manage loading, success, and error states
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    
    const handleButtonClick = async () => {
        // Optional: Confirm the action with the user
        const confirmed = window.confirm("Are you sure you want to clear the database? This action cannot be undone.");
        if (!confirmed) return;

        // Reset messages and set loading state
        setSuccessMessage(null);
        setErrorMessage(null);
        setLoading(true);

        try {
            // Send POST request to the API endpoint
            const response = await fetch('/api/clear-database', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // Include body if your API expects additional data
                // body: JSON.stringify({ key: 'value' })
            });

            // Parse the JSON response
            const data = await response.json();

            if (!response.ok) {
                // If response is not OK, throw an error to be caught below
                throw new Error(data.message || 'Failed to clear the database.');
            }

            // If successful, set the success message
            setSuccessMessage(data.message);
        } catch (error: any) {
            // If an error occurs, set the error message
            setErrorMessage(error.message || 'An unexpected error occurred.');
        } finally {
            // Reset loading state
            setLoading(false);
        }
    };

    return (
        <div className='text-center'>
            <button
                onClick={handleButtonClick}
                disabled={loading}
                className={`px-4 py-2 bg-red-500 text-white rounded ${
                    loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-600'
                }`}
            >
                {loading ? 'Clearing...' : 'Clear Database'}
            </button>
            {/* Display success or error messages */}
            {successMessage && <p className='text-green-500 mt-2'>{successMessage}</p>}
            {errorMessage && <p className='text-red-500 mt-2'>{errorMessage}</p>}
        </div>
    );
}