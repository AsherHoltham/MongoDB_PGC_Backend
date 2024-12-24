"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navigation = () => {
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
            href = "/about" 
            className = {pathname === "/about" ? "font-bold mr-4" : "mr-4 text-blue-500"}
            >
                About
            </Link>
            <Link 
            href = "/users/X" 
            className = {pathname.startsWith("/users/X") ? "font-bold mr-4" : "mr-4 text-blue-500"}
            >
                User X
            </Link>
        </nav>
    );
}