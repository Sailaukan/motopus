'use client'

import { SignIn } from "@clerk/nextjs";
import { useRouter } from 'next/navigation';

export default function Page() {
    const router = useRouter();
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-500 via-purple-600 to-purple-500 flex flex-col justify-center items-center p-4">
            <div className="w-full max-w-md flex flex-col items-center">
                <button 
                    onClick={() => router.push('/')} 
                    className="bg-white text-purple-600 font-semibold mb-4 py-2 px-6 rounded-full shadow-md hover:bg-purple-100 transition duration-300 ease-in-out transform hover:scale-105 flex items-center"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Back to Home
                </button>
                <SignIn />
            </div>
        </div>
    );
}