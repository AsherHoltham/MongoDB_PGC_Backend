"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const GlobalNavBar = () => {
    const pathname = usePathname();
    return (
        <footer className="bg-gradient-to-r from-indigo-600 to-blue-500 shadow-md fixed bottom-0 w-full z-10">
            <div className="container mx-auto px-4 py-3 flex justify-center">
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
                href = "/trips" 
                className = {pathname === "/trips" ? "font-bold mr-4" : "mr-4 text-blue-500"}
                >
                    Trips
                </Link>
                <Link 
                href = "/user-profile" 
                className = {pathname === "/user-profile" ? "font-bold mr-4" : "mr-4 text-blue-500"}
                >
                    Profile
                </Link>
            </div>
        </footer>
    );
}