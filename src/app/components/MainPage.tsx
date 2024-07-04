'use client';

import React, { useState, FormEvent } from 'react';
import { Player } from "@remotion/player";
import { Main } from '../remotion/Root';
import axios from 'axios';
import additionalPrompt from "../api/claude/additionalPrompt";
import Footer from './Footer';
import MainContent from './MainContent';
import NavBar from './NavBar';

const initialCode = JSON.stringify({
    background: "linear-gradient(45deg, #1a1a1a, #4a4a4a)",
    commands: [
        {
            type: "text",
            props: {
                text: "AI Animation Generator",
                startColor: "#FFFFFF",
                finishColor: "#FFA500",
                startSize: 5,
                finishSize: 6,
                startTop: 20,
                finishTop: 25,
                startLeft: 10,
                finishLeft: 15,
                start: 30,
                duration: 90,
                animation: "bounce"
            }
        },
        {
            type: "text",
            props: {
                text: "Transform Your Ideas",
                startColor: "#FFFFFF",
                finishColor: "#00FF00",
                startSize: 4.5,
                finishSize: 5,
                startTop: 30,
                finishTop: 35,
                startLeft: 20,
                finishLeft: 25,
                start: 120,
                duration: 90,
                animation: "rotate"
            }
        },
        {
            type: "shape",
            props: {
                shape: "circle",
                startColor: "#FF0000",
                finishColor: "#0000FF",
                startSize: 3,
                finishSize: 5,
                startTop: 70,
                finishTop: 65,
                startLeft: 80,
                finishLeft: 75,
                start: 60,
                duration: 120
            }
        },
        {
            type: "shape",
            props: {
                shape: "triangle",
                startColor: "#FFFF00",
                finishColor: "#FF00FF",
                startSize: 4,
                finishSize: 6,
                startTop: 60,
                finishTop: 55,
                startLeft: 5,
                finishLeft: 10,
                start: 90,
                duration: 150
            }
        },
        {
            type: "text",
            props: {
                text: "Unleash Creativity",
                startColor: "#00FFFF",
                finishColor: "#FF1493",
                startSize: 4,
                finishSize: 4.5,
                startTop: 80,
                finishTop: 75,
                startLeft: 30,
                finishLeft: 35,
                start: 180,
                duration: 120,
                animation: "scale"
            }
        }
    ]
});

interface ClaudeResponse {
    content: Array<{ text: string }>;
}

const MainPage: React.FC = () => {
    const [text, setText] = useState<string>('');
    const [code, setCode] = useState<string>(initialCode);
    const [response, setResponse] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const combinedPrompt = `${additionalPrompt}${text}`;

    const handleSubmit = async (e: FormEvent<HTMLElement>) => {
        e.preventDefault();
        console.log(combinedPrompt);
        setLoading(true);

        try {
            const res = await axios.post<ClaudeResponse>('/api/claude', {
                messages: [{ role: 'user', content: combinedPrompt }],
                model: 'claude-3-5-sonnet-20240620',
                max_tokens: 4000,
            });
            setResponse(res.data.content[0].text);
            setCode(res.data.content[0].text);
            console.log(res.data.content[0].text);
            console.log(code);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    }

    return (
        <div>
            <div className="flex flex-col min-h-[100dvh]">
                <NavBar />
                <div className="bg-primary text-primary-foreground py-15 md:py-15 lg:py-20">
                    <div className="container px-4 md:px-6">
                        <div className="max-w-3xl mx-auto text-center space-y-4">
                            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold tracking-tight">Animate your ideas <br /> in 50 seconds</h1>
                            <p className="text-m opacity-40 mb-8 md:text-s lg:text-l tracking-tight">Describe video you want and get <br />AI generated animation</p>
                            <div className="flex justify-center">
                                <div className="relative w-full max-w-md">
                                    <input
                                        className="flex w-full border border-input bg-background px-5 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pr-24 h-12 md:h-14 lg:h-16 rounded-lg"
                                        placeholder="Dynamic video presentation about Brawl Stars"
                                        type="text"
                                        onChange={handleInput}
                                        style={{
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden'
                                        }}
                                    />
                                    <button
                                        className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 hover:text-purple-500 py-4 absolute right-1 top-1/2 -translate-y-1/2 h-10 md:h-12 lg:h-14 px-6 rounded-full"
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
                <div className="flex justify-center">
                    <div className="relative">
                        {loading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 bg-gray-700 z-10">
                                <div className="w-16 h-16 border-4 border-t-4 border-t-transparent border-white rounded-full animate-spin"></div>
                            </div>
                        )}
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
                            inputProps={{ code }}
                        />
                    </div>
                </div>
                <MainContent />
                <Footer />
            </div>
        </div>
    );
}

export default MainPage;
