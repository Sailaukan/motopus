const NavBar = () => {
    return (
        <nav className="bg-background border-b px-4 md:px-6">
            <div className="container flex items-center h-14 md:h-16 lg:h-18">
                <a className="mr-6 font-bold text-lg md:text-xl lg:text-2xl" href="#">
                    Motopus
                </a>
                <div className="ml-auto flex items-center gap-4 md:gap-6 lg:gap-8">
                    <a className="text-sm md:text-base lg:text-lg hover:underline" href="#">
                        About
                    </a>
                    <a className="text-sm md:text-base lg:text-lg hover:underline" href="#">
                        Features
                    </a>
                    <a className="text-sm md:text-base lg:text-lg hover:underline" href="#">
                        Contact
                    </a>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;