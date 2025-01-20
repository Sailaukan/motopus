import { toast } from "sonner";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const LandingInfo = () => {
    const [featureRef, featureInView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const [galleryRef, galleryInView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.2,
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        },
    };

    return (
        <div className="bg-gradient-to-b from-background to-purple-50/5">
            <div className="border-t-2 border-gray-200/50 my-4 w-full max-w-7xl mx-auto"></div>

            <section className="w-full pb-12 md:pb-18 lg:pb-28 pt-4 md:pt-6 lg:pt-8">
                <motion.div
                    ref={featureRef}
                    initial="hidden"
                    animate={featureInView ? "visible" : "hidden"}
                    variants={containerVariants}
                    className="container px-8 md:px-6 lg:px-4 flex flex-col items-center text-center space-y-8"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <motion.div
                            variants={cardVariants}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="relative bg-white/50 backdrop-blur-sm border text-card-foreground rounded-xl shadow-lg overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="flex flex-col items-center justify-center p-8 space-y-4">
                                <motion.div
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.5 }}
                                    className="bg-purple-500 rounded-full p-4"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="white"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="w-8 h-8"
                                    >
                                        <path d="m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08"></path>
                                        <path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z"></path>
                                    </svg>
                                </motion.div>
                                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Effortless Design</h3>
                                <p className="text-muted-foreground text-center">
                                    Our AI-powered tools make it easy to create stunning visuals without any experience.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            variants={cardVariants}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="relative bg-white/50 backdrop-blur-sm border text-card-foreground rounded-xl shadow-lg overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="flex flex-col items-center justify-center p-8 space-y-4">
                                <motion.div
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.5 }}
                                    className="bg-purple-500 rounded-full p-4"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="white"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="w-8 h-8"
                                    >
                                        <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"></path>
                                        <rect x="2" y="6" width="14" height="12" rx="2"></rect>
                                    </svg>
                                </motion.div>
                                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Cinematic Quality</h3>
                                <p className="text-muted-foreground text-center">
                                    Motopus applies vector graphics creating the highest quality animations
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            variants={cardVariants}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="relative bg-white/50 backdrop-blur-sm border text-card-foreground rounded-xl shadow-lg overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="flex flex-col items-center justify-center p-8 space-y-4">
                                <motion.div
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.5 }}
                                    className="bg-purple-500 rounded-full p-4"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="white"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="w-8 h-8"
                                    >
                                        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
                                        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
                                        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
                                        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
                                    </svg>
                                </motion.div>
                                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Accelerate Your Vision</h3>
                                <p className="text-muted-foreground text-center">
                                    Our AI-powered platform streamlines the video creation process, allowing you to bring your ideas to life
                                    in less than 15 seconds
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            <section className="w-full py-4 md:py-6 lg:py-10 mb-20">
                <motion.div
                    ref={galleryRef}
                    initial="hidden"
                    animate={galleryInView ? "visible" : "hidden"}
                    variants={containerVariants}
                    className="container px-4 md:px-6 flex flex-col items-center text-center space-y-8"
                >
                    <motion.div
                        variants={cardVariants}
                        className="max-w-3xl space-y-4 mb-6 md:mb-8 lg:mb-12"
                    >
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Trusted by creators from all over the world
                        </h2>
                        <p className="text-md md:text-lg lg:text-xl text-muted-foreground">
                            Generate videos with Motopus and share them on Instagram using the #motopus hashtag. The best videos will be featured on this page.
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-20"
                    >
                        {[
                            { img: "/1.jpg", title: "Animated website landing" },
                            { img: "/4.jpg", title: "Startup presentation" },
                            { img: "/2.jpg", title: "Instagram story" },
                            { img: "/3.jpg", title: "Movie animations" }
                        ].map((item, index) => (
                            <motion.a
                                key={index}
                                variants={cardVariants}
                                whileHover={{
                                    scale: 1.05,
                                    transition: { duration: 0.2 }
                                }}
                                className="cursor-pointer relative overflow-hidden rounded-xl bg-white/50 backdrop-blur-sm"
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
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.4 }}
                                    className="relative h-60 w-full"
                                >
                                    <img
                                        src={item.img}
                                        alt={item.title}
                                        className="h-full w-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                </motion.div>
                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <h3 className="text-xl font-semibold text-white">
                                        {item.title}
                                    </h3>
                                </div>
                            </motion.a>
                        ))}
                    </motion.div>
                </motion.div>
            </section>
        </div>
    );
};

export default LandingInfo;