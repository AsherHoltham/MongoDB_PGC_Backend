"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavigationBar = () => {
    const pathname = usePathname();
    return (
        <nav>
            <Link 
            href = "/" 
            className = {pathname === "/" ? "font-bold mr-4" : "mr-4 text-blue-500"}
            >
                Home
            </Link>
            <Link 
            href = "/login" 
            className = {pathname === "/login" ? "font-bold mr-4" : "mr-4 text-blue-500"}
            >
                Login
            </Link>
            <Link 
            href = "/register" 
            className = {pathname === "/register" ? "font-bold mr-4" : "mr-4 text-blue-500"}
            >
                Register
            </Link>
            <Link 
            href = "/forgot-password" 
            className = {pathname === "/forgot-password"   ? "font-bold mr-4" : "mr-4 text-blue-500"}
            >
                Forgot-Password
            </Link>
            <Link 
            href = "/first-login" 
            className = {pathname === "/first-login"   ? "font-bold mr-4" : "mr-4 text-blue-500"}
            >
                Verification-Login
            </Link>
            <Link 
            href = "/cleardb" 
            className = {pathname === "/cleardb"   ? "font-bold mr-4" : "mr-4 text-blue-500"}
            >
                Clear-Database
            </Link>
        </nav>
    );
}