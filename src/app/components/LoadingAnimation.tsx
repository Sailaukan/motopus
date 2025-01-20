import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingAnimation: React.FC = () => {
    const [loadingText, setLoadingText] = useState('Initializing creativity...');
    const [progress, setProgress] = useState(0);

    const loadingPhrases = [
        'Rendering high-resolution graphics...',
        'Aligning design elements...',
        'Loading scripts...',
        'Generating images...',
        'Applying styles...',
        'Just a few seconds left...',
        'Bringing it all together...',
        'Compiling resources...',
        'Applying final touches...'
    ];

    useEffect(() => {
        const textInterval = setInterval(() => {
            setLoadingText(loadingPhrases[Math.floor(Math.random() * loadingPhrases.length)]);
        }, 4000);

        const progressInterval = setInterval(() => {
            setProgress(prev => (prev >= 95 ? 95 : prev + 1));
        }, 150);

        return () => {
            clearInterval(textInterval);
            clearInterval(progressInterval);
        };
    }, []);

    const circleVariants = {
        animate: {
            scale: [1, 1.2, 1],
            rotate: [0, 360],
            transition: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    const textVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-purple-600 via-indigo-700 to-blue-800 z-50">
            <div className="relative w-full max-w-md">
                {/* Floating particles in background */}
                <div className="absolute inset-0 overflow-hidden">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-white rounded-full opacity-20"
                            animate={{
                                x: [Math.random() * 400, Math.random() * 400],
                                y: [Math.random() * 400, Math.random() * 400],
                            }}
                            transition={{
                                duration: Math.random() * 3 + 2,
                                repeat: Infinity,
                                repeatType: "reverse",
                            }}
                        />
                    ))}
                </div>

                <motion.div
                    className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 flex flex-col items-center space-y-8 shadow-2xl border border-white/20"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Main loading spinner */}
                    <div className="relative w-40 h-40">
                        <motion.div
                            variants={circleVariants}
                            animate="animate"
                            className="absolute inset-0 border-8 border-transparent border-t-white rounded-full"
                        />
                        <motion.div
                            variants={circleVariants}
                            animate="animate"
                            className="absolute inset-4 border-6 border-transparent border-t-purple-400 rounded-full"
                        />
                        <motion.div
                            variants={circleVariants}
                            animate="animate"
                            className="absolute inset-8 border-4 border-transparent border-t-indigo-400 rounded-full"
                        />

                        {/* Center dot */}
                        <motion.div
                            className="absolute inset-0 m-auto w-4 h-4 bg-white rounded-full"
                            animate={{
                                scale: [1, 1.5, 1],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                            }}
                        />
                    </div>

                    {/* Loading text with animation */}
                    <div className="h-20 flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={loadingText}
                                variants={textVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                className="text-white text-xl font-medium text-center"
                            >
                                {loadingText}
                            </motion.p>
                        </AnimatePresence>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-purple-400 to-indigo-400"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>

                    {/* Progress percentage */}
                    <motion.p
                        className="text-white/80 text-sm font-medium"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        {progress}% Complete
                    </motion.p>
                </motion.div>
            </div>
        </div>
    );
};

export default LoadingAnimation;
