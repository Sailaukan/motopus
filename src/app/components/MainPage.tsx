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
    "commands": [
        {
            "type": "text",
            "props": {
                "text": "Sliding out to the left",
                "animation": "slideInFromLeft",
                "start": 0,
                "duration": 60,
                "startColor": "#FFFFFF",
                "finishColor": "#FFFFFF",
                "startSize": 60,
                "finishSize": 60,
                "startTop": 360,
                "finishTop": 360,
                "startLeft": 1280,
                "finishLeft": 640
            }
        },
        {
            "type": "text",
            "props": {
                "text": "This sentence will appear word by word",
                "animation": "progressiveReveal",
                "start": 60,
                "duration": 120,
                "startColor": "#FFFFFF",
                "finishColor": "#FFFFFF",
                "startSize": 50,
                "finishSize": 50,
                "startTop": 360,
                "finishTop": 360,
                "startLeft": 640,
                "finishLeft": 640
            }
        }
    ],
    "background": "#000000"
}

);


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
                <div className="flex justify-center my-8 px-4">
                    <div className="relative w-full max-w-[1280px] aspect-video">
                        {loading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 bg-gray-700 z-10 rounded-lg">
                                <div className="w-16 h-16 border-4 border-t-4 border-t-transparent border-white rounded-full animate-spin"></div>
                            </div>
                        )}
                        <Player
                            component={Main}
                            inputProps={{ code }}
                            durationInFrames={900}
                            compositionWidth={1280}
                            compositionHeight={720}
                            fps={30}
                            controls
                            autoPlay
                            loop
                            style={{
                                width: '100%',
                                height: '100%',
                            }}
                            className="rounded-lg shadow-lg"
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