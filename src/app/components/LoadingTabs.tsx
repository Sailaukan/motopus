import React, { useEffect } from 'react';

const LoadingSpinner: React.FC = () => {
    useEffect(() => {
        const styleSheet = document.createElement('style');
        styleSheet.type = 'text/css';
        styleSheet.innerText = `
      @keyframes bounce {
        0%, 100% { 
          transform: scale(0.0);
        } 
        50% { 
          transform: scale(1.0);
        }
      }
    `;
        document.head.appendChild(styleSheet);

        return () => {
            document.head.removeChild(styleSheet);
        };
    }, []);

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="relative w-10 h-10">
                <div
                    className="absolute w-full h-full rounded-full bg-gray-600 opacity-60"
                    style={{
                        animation: 'bounce 2.0s infinite ease-in-out'
                    }}
                ></div>
                <div
                    className="absolute w-full h-full rounded-full bg-gray-600 opacity-60"
                    style={{
                        animation: 'bounce 2.0s infinite ease-in-out',
                        animationDelay: '-1.0s'
                    }}
                ></div>
            </div>
        </div>
    );
};

export default LoadingSpinner;
