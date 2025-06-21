import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
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
        <main className="relative overflow-hidden">
        {children}
        </main>
      </body>
    </html>
  );
}
