const Footer = () => {
    return (
        <footer className="bg-muted text-muted-foreground py-6 md:py-8 lg:py-10">
            <div className="container px-4 md:px-6 flex items-center justify-between">
                <p className="text-sm md:text-base lg:text-lg">© 2024 Motopus. All rights reserved</p>
                <div className="flex items-center gap-4 md:gap-6 lg:gap-8">
                    <a className="text-sm md:text-base lg:text-lg hover:underline" href="#">
                        Privacy
                    </a>
                    <a className="text-sm md:text-base lg:text-lg hover:underline" href="#"></a>
                </div>
            </div>
        </footer>
    )
}

export default Footer;