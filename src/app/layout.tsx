import type { Metadata } from "next";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import Head from "next/head";
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
        <body>
          <header>
            {/* <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn> */}
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
