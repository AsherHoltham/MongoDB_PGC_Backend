import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "../components/navigation";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       <body className="flex flex-col min-h-screen">

        <header className="bg-[#18181b] text-white p-4 text-center">
          <Navigation/>
        </header>

        <main className="flex-grow">
          {children}
        </main>

        <footer className="bg-[#18181b] text-white p-4 text-center">
            PGC
        </footer>
      </body>
    </html>
  );
}
