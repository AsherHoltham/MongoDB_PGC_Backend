"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavigationBar = () => {
    const pathname = usePathname();
    return (
        <nav className="bg-gradient-to-r from-indigo-600 to-blue-500 shadow-md fixed w-full z-10 flex justify-center">
            <Link 
            href = "/" 
            className = {pathname === "/" ? "font-bold mr-4" : "mr-4 text-blue-500"}
            >
                Home
            </Link>
            <Link 
            href = "/about" 
            className = {pathname === "/about" ? "font-bold mr-4" : "mr-4 text-blue-500"}
            >
                About
            </Link>
            <Link 
            href = "/register" 
            className = {pathname === "/register" ? "font-bold mr-4" : "mr-4 text-blue-500"}
            >
                Register
            </Link>
             <Link 
            href = "/verify-email" 
            className = {pathname === "/verify-email"   ? "font-bold mr-4" : "mr-4 text-blue-500"}
            >
                Verify-Email
            </Link>
            <Link 
            href = "/login" 
            className = {pathname === "/login" ? "font-bold mr-4" : "mr-4 text-blue-500"}
            >
                Login
            </Link>
            <Link
            href = "/cleardb" 
            className = {pathname === "/cleardb"   ? "font-bold mr-4" : "mr-4 text-blue-500"}
            >
                clear-DataBase
            </Link>
        </nav>
    );
}