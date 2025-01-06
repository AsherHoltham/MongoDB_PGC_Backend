"use client";
import Link from "next/link";
import Image from 'next/image';
import { usePathname } from "next/navigation";
import "../styles/navigation-bar.css"; // Make sure your CSS path is correct

export const NavigationBarG = () => {
  const pathname = usePathname();

  return (
    <div className="nav-bar-case">
        <Link href="/">
        <button className={`home-button ${pathname === "/" ? "active" : ""}`}>
                <Image
                    src="/icon/home.svg"    // Adjust this path if needed
                    alt="My Icon"
                    width={800}                // Original dimensions
                    height={800}
                    style={{
                        width: '4vw',         // 1/8 of the viewport width
                        height: 'auto'           // keep aspect ratio
                    }}
                />
            </button>
            <footer className="text-center text-sm mt-1 font-bold text-black">Home</footer>
        </Link>

        <Link href="/about">
            <button className={`about-button ${pathname === "/about" ? "active" : ""}`}>
                <Image
                    src="/icon/info.svg"    // Adjust this path if needed
                    alt="My Icon"
                    width={800}                // Original dimensions
                    height={800}
                    style={{
                        width: '4vw',         // 1/8 of the viewport width
                        height: 'auto'           // keep aspect ratio
                    }}
                />
            </button>
            <footer className="text-center text-sm mt-1 font-bold text-black">Info</footer>
        </Link>

        <Link href="/trips">
            <button className={`trips-button ${pathname === "/trips" ? "active" : ""}`}>
                <Image
                    src="/icon/trips.svg"    // Adjust this path if needed
                    alt="My Icon"
                    width={800}                // Original dimensions
                    height={800}
                    style={{
                        width: '4vw',         // 1/8 of the viewport width
                        height: 'auto'           // keep aspect ratio
                    }}
                />
            </button>
            <footer className="text-center text-sm mt-1 font-bold text-black">Trips</footer>
        </Link>

        <Link href="/user-profile">
            <button className={`profile-button ${pathname === "/user-profile" ? "active" : ""}`}>
                <Image
                    src="/icon/user-profile.svg"    // Adjust this path if needed
                    alt="My Icon"
                    width={800}                // Original dimensions
                    height={800}
                    style={{
                        width: '4vw',         // 1/8 of the viewport width
                        height: 'auto'           // keep aspect ratio
                    }}
                />
            </button>
            <footer className="text-center text-sm mt-1 font-bold text-black">Profile</footer>
        </Link>
    </div>
  );
};