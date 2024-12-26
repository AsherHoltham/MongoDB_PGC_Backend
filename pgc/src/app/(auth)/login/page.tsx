import { LoginForm } from "../../components/login_form";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Login() {
    return (
    <div>
        <main>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                <h1>Login Page</h1>
            </div>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                <LoginForm />
            </div>
            <div style={{ textAlign: "center" }}>
                <Link
                    href = "/register" 
                    className = {"mr-4 text-blue-500"}
                    >
                        Create Account
                </Link>
            </div>
            <div style={{ textAlign: "center" }}>
                <Link
                    href = "/forgot-password" 
                    className = {"mr-4 text-blue-500"}
                    >
                        Forgot Password
                </Link>
            </div>
        </main>
    </div>
    );
}