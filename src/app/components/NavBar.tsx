const NavBar = () => {
    return (
        <nav className="bg-background relative">
            <div className="container flex items-center justify-between h-14 px-4 md:px-6 pd-8">
                <div className="flex items-center gap-2">
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/9c4d4fbc74bacfefbef7172e23269ab34bddd531a51dc11bc89bb4fe76e05dd4?apiKey=4b5f1316a87a4001a6d1a0d442d42b35&"
                        className="w-12 h-12 object-contain"
                        alt="Motopus logo"
                    />
                    <span className="text-2xl font-bold">motopus</span>
                </div>

                <div className="flex items-center gap-6">
                    <a className="text-sm opacity-60 hover:opacity-100 transition-opacity" href="#">
                        Docs
                    </a>
                    <a className="text-sm opacity-60 hover:opacity-100 transition-opacity" href="#">
                        Examples
                    </a>
                </div>

                <button className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm hover:bg-purple-700 transition-colors shadow-sm">
                    Sign In
                </button>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>
        </nav>
    )
}

export default NavBar;