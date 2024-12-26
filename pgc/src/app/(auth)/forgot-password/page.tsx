import Link from "next/link";

export default function ForgotPassword() {
    return (
        <div style={{ textAlign: "center" }}>
            <h1>Forgot it</h1>
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