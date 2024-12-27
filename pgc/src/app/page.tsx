"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import '../../styles/home.css'; // Import your stylesheet

export default function Home() {
  const pathname = usePathname();

  return ( 
    <div className="text-center">
      <h1>PGC</h1>
      <div className="link-container">
        <Link 
          href="/login" 
          className={pathname === "/login" ? "link link-active" : "link"}
        >
          Login
        </Link>
        <Link 
          href="/register" 
          className={pathname === "/register" ? "link link-active" : "link"}
        >
          Register
        </Link>
      </div>
    </div>
  );
}