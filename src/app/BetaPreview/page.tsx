const BetaPreview = () => {
    return (
        <div className="flex flex-col min-h-[100dvh]">
            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
                    <div className="container px-4 md:px-6">
                        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                            <div className="flex flex-col justify-center space-y-4">
                                <div className="space-y-2">
                                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                                        Animate your ideas in 40 seconds using Motopus
                                    </h1>
                                    <p className="max-w-[600px] text-muted-foreground md:text-xl">
                                        Our cutting-edge 2D animation tool harnesses the power of AI to revolutionize your motion design
                                        workflow. Create stunning animations with ease, from concept to final product.
                                    </p>
                                </div>
                                <div className="w-full max-w-sm space-y-2">
                                    <form className="flex gap-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 max-w-lg flex-1"
                                            placeholder="Enter your email"
                                            type="email"
                                        />
                                        <button
                                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                                            type="submit"
                                        >
                                            Join Beta
                                        </button>
                                    </form>
                                    <p className="text-xs text-muted-foreground">
                                        Be the first to experience our groundbreaking motion design tool. Sign up for the beta and get
                                        notified when it's ready.
                                    </p>
                                </div>
                            </div>
                            <img
                                src="/placeholder.svg"
                                width="550"
                                height="550"
                                alt="Motion Design Tool"
                                className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
                            />
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">AI-Powered Motion Design</div>
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Elevate Your Animations with Ease</h2>
                                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    Our AI-powered 2D animation tool takes the complexity out of motion design, allowing you to create
                                    captivating animations with just a few clicks. Unleash your creativity and bring your ideas to life
                                    like never before.
                                </p>
                            </div>
                        </div>
                        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
                            <img
                                src="/placeholder.svg"
                                width="550"
                                height="310"
                                alt="AI-Powered Motion Design"
                                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                            />
                            <div className="flex flex-col justify-center space-y-4">
                                <ul className="grid gap-6">
                                    <li>
                                        <div className="grid gap-1">
                                            <h3 className="text-xl font-bold">Intelligent Automation</h3>
                                            <p className="text-muted-foreground">
                                                Our AI-powered algorithms handle the technical complexities, allowing you to focus on your
                                                creative vision.
                                            </p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="grid gap-1">
                                            <h3 className="text-xl font-bold">Seamless Workflow</h3>
                                            <p className="text-muted-foreground">
                                                Streamline your motion design process with intuitive tools and real-time collaboration features.
                                            </p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="grid gap-1">
                                            <h3 className="text-xl font-bold">Stunning Animations</h3>
                                            <p className="text-muted-foreground">
                                                Elevate your projects with visually stunning animations that captivate your audience.
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                                Unlock Your Creative Potential with Our Motion Design Tool
                            </h2>
                            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                Elevate your motion design projects with our AI-powered tool, designed to streamline your workflow and
                                unleash your creativity.
                            </p>
                        </div>
                        <div className="flex flex-col gap-2 min-[400px]:flex-row lg:justify-end">
                            <a
                                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                                href="#"
                            >
                                Join Beta
                            </a>
                            <a
                                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                                href="#"
                            >
                                Learn More
                            </a>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
                <p className="text-xs text-muted-foreground">© 2024 Motion Design Tool. All rights reserved.</p>
                <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                    <a className="text-xs hover:underline underline-offset-4" href="#">
                        Terms of Service
                    </a>
                    <a className="text-xs hover:underline underline-offset-4" href="#">
                        Privacy
                    </a>
                </nav>
            </footer>
        </div>
    )
}

export default BetaPreview;