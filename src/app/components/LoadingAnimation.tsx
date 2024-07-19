import React, { useState, useEffect } from 'react';

const LoadingAnimation: React.FC = () => {
    const [loadingText, setLoadingText] = useState('Initializing creativity...');

    const loadingPhrases = [
        'Rendering high-resolution graphics...',
        'Aligning design elements...',
        'Loading scripts...',
        'Brewing a color palette...',
        'Applying styles...',
        'Just a few seconds left...',
        'Bringing it all together...',
        'Compiling resources...',
        'Applying final touches...'
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setLoadingText(loadingPhrases[Math.floor(Math.random() * loadingPhrases.length)]);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-800 z-50">
            <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl p-10 flex flex-col items-center space-y-6 shadow-2xl">
                <div className="relative w-32 h-32">
                    <div className="absolute inset-0 border-8 border-transparent border-t-white rounded-full animate-spin"></div>
                    <div className="absolute inset-3 border-8 border-transparent border-t-purple-400 rounded-full animate-spin-slow"></div>
                    <div className="absolute inset-6 border-8 border-transparent border-t-indigo-400 rounded-full animate-spin-slower"></div>
                </div>
                <div className="w-64 h-24 flex items-center justify-center text-white text-xl font-bold text-center animate-pulse overflow-hidden">
                    <p className="w-full text-center">
                        {loadingText}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoadingAnimation;
