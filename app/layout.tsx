import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Employee Manager",
  description: "Employee Manager for manage employee",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        <Navbar />
      <main className="container mx-auto px-4 py-6">
         <Providers>
          {children}
        </Providers>  
        </main>
      </body>
    </html>
  );
}
