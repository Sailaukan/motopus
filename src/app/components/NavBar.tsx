import { useRouter } from 'next/navigation';
import { useUser } from "@clerk/clerk-react";
import { SignOutButton } from "@clerk/nextjs";

const NavBar = () => {
    const router = useRouter();
    const { isSignedIn } = useUser();

    return (
        <nav className="bg-background fixed top-0 left-0 right-0 z-50">
            <div className="container flex items-center justify-between h-12 sm:h-14 px-2 sm:px-4 md:px-6 py-6 sm:py-8">
                <div onClick={() => router.push('/')} className="flex items-center gap-1 sm:gap-2 hover:cursor-pointer hover:text-gray-600">
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/9c4d4fbc74bacfefbef7172e23269ab34bddd531a51dc11bc89bb4fe76e05dd4?apiKey=4b5f1316a87a4001a6d1a0d442d42b35&"
                        className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain"
                        alt="Motopus logo"
                    />
                    <span className="text-xl sm:text-2xl font-bold">motopus</span>
                </div>
                {!isSignedIn ?
                    <button onClick={() => router.push('/sign-up')} className="bg-purple-600 text-white px-3 py-3 lg:px-5 lg:py-3 rounded-md text-xs sm:text-sm hover:bg-purple-700 transition-colors shadow-lg">
                        Sign Up
                    </button>
                    :
                    <div>
                        <button onClick={() => router.push('/Editor')} className="bg-purple-600 mr-3 text-white px-3 py-3 lg:px-5 lg:py-3 rounded-md text-xs sm:text-sm hover:bg-purple-700 transition-colors shadow-lg">
                            Editor
                        </button>
                        <SignOutButton>
                            <button className="bg-white border-2 text-gray-400 px-3 py-3 lg:px-5 lg:py-3 rounded-lg text-xs sm:text-sm hover:border-0 hover:bg-purple-600 hover:text-white transition-colors ">
                                Sign Out
                            </button>
                        </SignOutButton>
                    </div>
                }
            </div>
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>
        </nav>
    )
}

export default NavBar;
