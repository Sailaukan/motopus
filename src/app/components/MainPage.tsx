'use client'

import Input from "./Input";

const MainPage = () => {
    return (
        <div>
            <div className="flex flex-col min-h-[100dvh]">
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
                <Input />
                <main className="flex-1">
                    <section className="py-12 md:py-20 lg:py-24">
                        <div className="container px-4 md:px-6">
                            <div className="max-w-3xl mx-auto text-center space-y-4">
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">About Motopus</h2>
                                <p className="text-muted-foreground text-lg md:text-xl lg:text-2xl">
                                    Motopus is a cutting-edge AI-powered platform that empowers users to unleash their creativity and bring
                                    their ideas to life. Our advanced algorithms and intuitive interface make it easy for anyone to generate
                                    stunning visuals, engaging content, and innovative solutions.
                                </p>
                            </div>
                        </div>
                    </section>
                    <section className="bg-muted py-12 md:py-20 lg:py-24">
                        <div className="container px-4 md:px-6">
                            <div className="max-w-3xl mx-auto text-center space-y-4">
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Key Features</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
                                    <div className="bg-background rounded-lg shadow-sm p-6 text-left space-y-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            className="w-8 h-8 text-primary"
                                        >
                                            <path d="M15 4V2"></path>
                                            <path d="M15 16v-2"></path>
                                            <path d="M8 9h2"></path>
                                            <path d="M20 9h2"></path>
                                            <path d="M17.8 11.8 19 13"></path>
                                            <path d="M15 9h0"></path>
                                            <path d="M17.8 6.2 19 5"></path>
                                            <path d="m3 21 9-9"></path>
                                            <path d="M12.2 6.2 11 5"></path>
                                        </svg>
                                        <h3 className="text-xl font-bold">Powerful AI</h3>
                                        <p className="text-muted-foreground">
                                            Our advanced AI algorithms generate high-quality, unique content tailored to your needs.
                                        </p>
                                    </div>
                                    <div className="bg-background rounded-lg shadow-sm p-6 text-left space-y-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            className="w-8 h-8 text-primary"
                                        >
                                            <path d="m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08"></path>
                                            <path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z"></path>
                                        </svg>
                                        <h3 className="text-xl font-bold">Intuitive Design</h3>
                                        <p className="text-muted-foreground">
                                            Our user-friendly interface makes it easy for anyone to create stunning visuals and content.
                                        </p>
                                    </div>
                                    <div className="bg-background rounded-lg shadow-sm p-6 text-left space-y-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            className="w-8 h-8 text-primary"
                                        >
                                            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
                                            <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
                                            <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
                                            <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
                                        </svg>
                                        <h3 className="text-xl font-bold">Rapid Ideation</h3>
                                        <p className="text-muted-foreground">
                                            Quickly generate and iterate on ideas, saving you time and boosting your productivity.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
                <footer className="bg-muted text-muted-foreground py-6 md:py-8 lg:py-10">
                    <div className="container px-4 md:px-6 flex items-center justify-between">
                        <p className="text-sm md:text-base lg:text-lg">© 2024 Motopus. All rights reserv</p>
                        <div className="flex items-center gap-4 md:gap-6 lg:gap-8">
                            <a className="text-sm md:text-base lg:text-lg hover:underline" href="#">
                                Privacy
                            </a>
                            <a className="text-sm md:text-base lg:text-lg hover:underline" href="#"></a>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    )
}

export default MainPage;