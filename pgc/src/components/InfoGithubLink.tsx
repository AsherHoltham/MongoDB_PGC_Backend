"use client";
import Link from "next/link";
import Image from 'next/image';
import "../styles/github-info.css";

export const InfoGithubLink = () => {
  return (
    <div className="info-github">
        <Link
        href="https://github.com/AsherHoltham/Trip-out-TheChat-web-app-codebase/tree/main"
        target="_blank"
        rel="noopener noreferrer"
        >
            <button>
                <Image
                    src="/icon/github.svg"    // Adjust this path if needed
                    alt="My Icon"
                    width={800}                // Original dimensions
                    height={800}
                    style={{
                        width: '12vw',         // 1/8 of the viewport width
                        height: 'auto'           // keep aspect ratio
                    }}
                />
            </button>
            <footer className="text-center text-sm mt-1 font-bold text-black">Project Github Repository</footer>
        </Link>
    </div>
  );
};