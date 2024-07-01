'use client'

import React, { useState, FormEvent } from 'react';
import { Player } from "@remotion/player";
import { useMyContext } from '../MyContext';
import axios from 'axios';
import additionalPrompt from "../api/claude/additionalPrompt";
import {
    Composition,
    Sequence,
    useCurrentFrame,
    useVideoConfig,
    interpolate,
    spring,
    random,
} from "remotion";

interface ClaudeResponse {
    content: Array<{ text: string }>;
}

const Main: React.FC = () => {
    const { text } = useMyContext();
    const frame = useCurrentFrame();
    const { width, height, durationInFrames, fps } = useVideoConfig();

    const colors = ['#FF3B30', '#FF9500', '#FFCC00', '#4CD964', '#5AC8FA', '#007AFF', '#5856D6', '#FF2D55'];

    const AnimatedText = ({ text, start, duration, color, size = '4rem', top }: { text: string; start: number; duration: number; color: string; size?: string; top: string }) => {
        const progress = Math.max(0, Math.min(1, (frame - start) / 15));
        const exitProgress = Math.max(0, Math.min(1, (frame - (start + duration - 15)) / 15));

        const x = interpolate(progress, [0, 1], [-100, 0], { extrapolateRight: 'clamp' });
        const exitX = interpolate(exitProgress, [0, 1], [0, 100], { extrapolateLeft: 'clamp' });

        const opacity = interpolate(
            frame,
            [start, start + 15, start + duration - 15, start + duration],
            [0, 1, 1, 0],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );

        return (
            <div
                style={{
                    position: 'absolute',
                    top,
                    left: '10%',
                    right: '10%',
                    fontFamily: 'SF Pro Display, Arial, sans-serif',
                    fontSize: size,
                    fontWeight: 'bold',
                    color: color,
                    opacity,
                    transform: `translateX(${x + exitX}px)`,
                    textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                }}
            >
                {text}
            </div>
        );
    };

    const MotopusLogo = ({ text }: { text: string }) => {
        const scale = spring({
            frame,
            config: { damping: 100, stiffness: 200, mass: 0.5 },
            fps: 30,
        });

        return (
            <div
                style={{
                    position: 'absolute',
                    top: '5%',
                    left: '5%',
                    transform: `scale(${scale})`,
                }}
            >
                <div
                    style={{
                        fontFamily: 'SF Pro Display, Arial, sans-serif',
                        fontSize: '3rem',
                        fontWeight: 'bold',
                        color: '#FFF',
                        letterSpacing: '2px',
                        textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                    }}
                >
                    {text}
                </div>
            </div>
        );
    };

    const DynamicBackground = () => {
        return (
            <svg width={width} height={height} style={{ position: 'absolute' }}>
                <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        {colors.map((color, index) => (
                            <stop
                                key={index}
                                offset={`${(index / (colors.length - 1)) * 100}%`}
                                stopColor={color}
                                stopOpacity={1}
                            >
                                <animate
                                    attributeName="stop-color"
                                    values={`${color};${colors[(index + 1) % colors.length]};${color}`}
                                    dur={`${durationInFrames / 30}s`}
                                    repeatCount="indefinite"
                                />
                            </stop>
                        ))}
                    </linearGradient>
                </defs>
                <rect width={width} height={height} fill="url(#grad)">
                    <animate
                        attributeName="opacity"
                        values="0.7;0.9;0.7"
                        dur="10s"
                        repeatCount="indefinite"
                    />
                </rect>
                {Array.from({ length: 50 }).map((_, i) => (
                    <circle
                        key={i}
                        r={random(`circle-${i}`) * 20 + 5}
                        cx={random(`cx-${i}`) * width}
                        cy={random(`cy-${i}`) * height}
                        fill="#FFF"
                        opacity={0.1}
                    >
                        <animate
                            attributeName="cy"
                            from={-50}
                            to={height + 50}
                            dur={`${random(`duration-${i}`) * 10 + 5}s`}
                            repeatCount="indefinite"
                        />
                    </circle>
                ))}
            </svg>
        );
    };

    const UserPrompt = ({ text }: { text: string }) => {
        const opacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });

        const animationProgress = (frame % (4 * fps)) / (4 * fps);

        const xOffset = interpolate(animationProgress, [0, 0.25, 0.5, 0.75, 1], [0, 50, 0, -50, 0]);
        const yOffset = interpolate(animationProgress, [0, 0.25, 0.5, 0.75, 1], [0, -50, 0, 50, 0]);

        return (
            <div
                style={{
                    position: 'absolute',
                    bottom: '10%',
                    left: '5%',
                    right: '5%',
                    padding: '20px',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '15px',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                    transform: `translate(${xOffset}px, ${yOffset}px)`,
                    opacity,
                    transition: 'transform 0.5s ease-in-out',
                }}
            >
                <div style={{ fontSize: '1.5rem', color: '#FFF', marginBottom: '10px' }}>Your Prompt:</div>
                <div
                    style={{
                        fontFamily: 'SF Pro Display, Arial, sans-serif',
                        fontSize: '2.5rem',
                        fontWeight: 'bold',
                        color: '#FFF',
                        textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                    }}
                >
                    {text}
                </div>
            </div>
        );
    };

    return (
        <div style={{ flexGrow: 1, background: '#000' }}>
            <Sequence from={0} durationInFrames={durationInFrames}>
                <DynamicBackground />
            </Sequence>
            <Sequence from={0} durationInFrames={durationInFrames}>
                <MotopusLogo text="Motopus" />
            </Sequence>
            <Sequence from={0} durationInFrames={durationInFrames}>
                <UserPrompt text={text} />
            </Sequence>
            <AnimatedText text="AI Animation Generator" start={30} duration={90} color="#FFF" size="5rem" top="20%" />
            <AnimatedText text="Transform Your Ideas" start={120} duration={90} color="#FFF" size="4.5rem" top="30%" />
            <AnimatedText text="Fast • Intuitive • Powerful" start={210} duration={90} color="#FFF" size="4rem" top="20%" />
            <AnimatedText text="Unleash Your Creativity" start={300} duration={90} color="#FFF" size="4.5rem" top="30%" />
            <AnimatedText text="Let's bring it to life!" start={390} duration={210} color="#FFF" size="5rem" top="20%" />
        </div>
    );
};

const MainPage: React.FC = () => {
    const { text, setText } = useMyContext();
    const { code, setCode } = useMyContext();
    const [response, setResponse] = useState<string>('');

    const combinedPrompt = `${additionalPrompt}${text}`;

    const handleSubmit = async (e: FormEvent<HTMLElement>) => {
        e.preventDefault();
        console.log('submitted');
        console.log(combinedPrompt);

        var x = "console.log('I am'); console.log('Alive!')";
        new Function(x)();

        try {
            const res = await axios.post<ClaudeResponse>('/api/claude', {
                messages: [{ role: 'user', content: combinedPrompt }],
                model: 'claude-3-5-sonnet-20240620',
                max_tokens: 4000,
            });
            setResponse(res.data.content[0].text);
            setCode(res.data.content[0].text)
            console.log(res.data.content[0].text)
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value)
    }

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
                <div className="bg-primary text-primary-foreground py-20 md:py-20 lg:py-24">
                    <div className="container px-4 md:px-6">
                        <div className="max-w-3xl mx-auto text-center space-y-4">
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">Motion design in 40 seconds</h1>

                            <div className="flex justify-center">
                                <div className="relative w-full max-w-md">
                                    <input
                                        className="flex w-full border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pr-20 h-12 md:h-14 lg:h-16 rounded-full"
                                        placeholder="Enter your prompt..."
                                        type="text"
                                        onChange={handleInput}
                                    />
                                    <button
                                        className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 py-2 absolute right-1 top-1/2 -translate-y-1/2 h-10 md:h-12 lg:h-14 px-6 rounded-full"
                                        type="submit"
                                        onClick={handleSubmit}
                                    >
                                        Generate
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex  justify-center">
                    <Player
                        className="border rounded-lg"
                        component={Main}
                        durationInFrames={10 * 30}
                        compositionWidth={1280}
                        compositionHeight={500}
                        fps={30}
                        controls
                        autoPlay
                        loop
                        style={{
                            height: 400,
                        }}
                    />
                </div>
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
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
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
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
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
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
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
                        <p className="text-sm md:text-base lg:text-lg">© 2024 Motopus. All rights reserved</p>
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