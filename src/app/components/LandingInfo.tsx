import { toast } from "sonner";
import { Button } from "./ui/button";

const LandingInfo = () => {
    return (
        <div>
            <div className="border-t-2 border-gray-200 my-4"></div>
            <section className="w-full pb-12 md:pb-18 lg:pb-28 pt-4 md:pt-6 lg:pt-8">
                <div className="container px-8 md:px-6 lg:px-4 flex flex-col items-center text-center space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="border text-card-foreground rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl" data-v0-t="card">
                            <div className="flex flex-col items-center justify-center p-8 space-y-4">
                                <div className="bg-purple-500 rounded-full p-4">
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
                                        className="text-primary-foreground w-8 h-8"
                                    >
                                        <path d="m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08"></path>
                                        <path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z"></path>
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold">Effortless Design</h3>
                                <p className="text-muted-foreground text-center">
                                    Our AI-powered tools make it easy to create stunning visuals without any experience.
                                </p>
                            </div>
                        </div>
                        <div className="border text-card-foreground rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl" data-v0-t="card">
                            <div className="flex flex-col items-center justify-center p-8 space-y-4">
                                <div className="bg-purple-500 rounded-full p-4">
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
                                        className="text-primary-foreground w-8 h-8"
                                    >
                                        <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"></path>
                                        <rect x="2" y="6" width="14" height="12" rx="2"></rect>
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold">Cinematic Quality</h3>
                                <p className="text-muted-foreground text-center">
                                    Motopus applies vector graphics creating the highest quality animations  
                                </p>
                            </div>
                        </div>
                        <div className="border text-card-foreground rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl" data-v0-t="card">
                            <div className="flex flex-col items-center justify-center p-8 space-y-4">
                                <div className="bg-purple-500 rounded-full p-4">
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
                                        className="text-primary-foreground w-8 h-8"
                                    >
                                        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
                                        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
                                        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
                                        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold">Accelerate Your Vision</h3>
                                <p className="text-muted-foreground text-center">
                                    Our AI-powered platform streamlines the video creation process, allowing you to bring your ideas to life
                                    in less than 15 seconds
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="w-full py-4 md:py-6 lg:py-10 mb-20">
                <div className="container px-4 md:px-6 flex flex-col items-center text-center space-y-8">
                    <div className="max-w-3xl space-y-4 mb-6 md:mb-8 lg:mb-12">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">Trusted by creators from all over the world</h2>
                        <p className="text-md md:text-lg lg:text-xl text-muted-foreground ">
                            Generate videos with Motopus and share them on Instagram using the #motopus hashtag. The best videos will be featured on this page.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-20">
                        <a
                            className="cursor-pointer shadow-md hover:shadow-xl group relative overflow-hidden rounded-lg transition-all hover:scale-105 focus:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            rel="ugc"
                            onClick={() =>
                                toast("Not available", {
                                    description: "Video isn't available yet",
                                    action: {
                                        label: "Close",
                                        onClick: () => console.log("Close"),
                                    },
                                })
                            }
                        >
                            <img
                                src="/1.jpg"
                                alt="Card Image"
                                width="400"
                                height="300"
                                className="h-60 w-full object-cover transition-all group-hover:scale-105 group-focus:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
                            <div className="absolute bottom-0 left-0 right-0 px-6 pb-4">
                                <h3 className="text-xl font-semibold text-card-foreground group-hover:underline group-focus:underline">
                                    Animated website landing
                                </h3>
                            </div>
                        </a>
                        <a
                            className="cursor-pointer shadow-md hover:shadow-xl group relative overflow-hidden rounded-lg transition-all hover:scale-105 focus:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            // href="#"
                            rel="ugc"
                            onClick={() =>
                                toast("Not available", {
                                    description: "Video isn't available yet",
                                    action: {
                                        label: "Close",
                                        onClick: () => console.log("Close"),
                                    },
                                })
                            }
                        >
                            <img
                                src="/4.jpg"
                                alt="Card Image"
                                width="400"
                                height="300"
                                className="h-60 w-full object-cover transition-all group-hover:scale-105 group-focus:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
                            <div className="absolute bottom-0 left-0 right-0 px-6 pb-4">
                                <h3 className="text-xl font-semibold text-card-foreground group-hover:underline group-focus:underline">
                                    Startup presentation
                                </h3>
                            </div>
                        </a>
                        <a
                            className="cursor-pointer shadow-md hover:shadow-xl group relative overflow-hidden rounded-lg transition-all hover:scale-105 focus:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            // href="#"
                            rel="ugc"
                            onClick={() =>
                                toast("Not available", {
                                    description: "Video isn't available yet",
                                    action: {
                                        label: "Close",
                                        onClick: () => console.log("Close"),
                                    },
                                })
                            }
                        >
                            <img
                                src="/2.jpg"
                                alt="Card Image"
                                width="400"
                                height="300"
                                className="h-60 w-full object-cover transition-all group-hover:scale-105 group-focus:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
                            <div className="absolute bottom-0 left-0 right-0 px-6 pb-4">
                                <h2 className="text-xl font-semibold text-card-foreground group-hover:underline group-focus:underline">
                                    Instagram story
                                </h2>
                            </div>
                        </a>
                        <a
                            className="cursor-pointer shadow-md hover:shadow-xl group relative overflow-hidden rounded-lg transition-all hover:scale-105 focus:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            // href="#"
                            rel="ugc"
                            onClick={() =>
                                toast("Not available", {
                                    description: "Video isn't available yet",
                                    action: {
                                        label: "Close",
                                        onClick: () => console.log("Close"),
                                    },
                                })
                            }
                        >
                            <img
                                src="/3.jpg"
                                alt="Card Image"
                                width="400"
                                height="300"
                                className="h-60 w-full object-cover transition-all group-hover:scale-105 group-focus:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
                            <div className="absolute bottom-0 left-0 right-0 px-6 pb-4">
                                <h3 className="text-xl font-semibold text-card-foreground group-hover:underline group-focus:underline">
                                    Movie animations
                                </h3>
                            </div>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default LandingInfo;