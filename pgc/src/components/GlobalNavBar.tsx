"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "../../styles/navigation.css"; // Make sure your CSS path is correct

export const GlobalNavBar = () => {
  const pathname = usePathname();

  return (
    <div className="nav-bar-case">
      <Link
        href="/"
        className={pathname === "/" ? "font-bold text-blue-500" : "text-blue-500"}
      >
        <button className="home-button">Home</button>
      </Link>

      <Link
        href="/about"
        className={pathname === "/about" ? "font-bold text-blue-500" : "text-blue-500"}
      >
        <button className="about-button">Info</button>
      </Link>

      <Link
        href="/trips"
        className={pathname === "/trips" ? "font-bold text-blue-500" : "text-blue-500"}
      >
        <button className="trips-button">Trips</button>
      </Link>

      <Link
        href="/user-profile"
        className={pathname === "/user-profile" ? "font-bold text-blue-500" : "text-blue-500"}
      >
        <button className="profile-button">Profile</button>
      </Link>
    </div>
  );
};