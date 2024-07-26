import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"
import {
  ClerkProvider
} from '@clerk/nextjs'
import { connectToMongoDB } from "@/lib/connectDB";

export const metadata: Metadata = {
  title: "Motopus",
  description: "AI motion design generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  connectToMongoDB();


  return (
    <ClerkProvider>
      <html lang="en">
        <Analytics />
        <body>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}


