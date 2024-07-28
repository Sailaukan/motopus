'use client'

import { Player } from "@remotion/player";
import useCodeStore from "../zustand/States";
import { Main } from "../remotion/Root";
import React, { useState, useEffect } from 'react';
import { Input } from "../components/ui/input";
import NavBar from "../components/NavBar";
import axios from 'axios';
import { useAuth } from "@clerk/nextjs";
import JsonEditor from "../components/JsonEditor";
import { CanvaLikeScroll } from "../components/CanvaLikeScroll";
import { Button } from "../components/ui/button";
import LoadingSpinner from "../components/LoadingTabs";
import additionalPrompt from "../api/claude/additionalPrompt";
import { createProject } from "@/lib/action";
import LoadingAnimation from "../components/LoadingAnimation";
import { toast } from "sonner";
import { Toaster } from "../components/ui/sonner";

interface ChatGPTResponse {
    choices: Array<{ message: { content: string } }>;
}

const EditorPage: React.FC = () => {

    const code = useCodeStore(state => state.code);
    const [text, setText] = useState<string>('');
    const setCode = useCodeStore(state => state.setCode);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isNewVideoOpen, setIsNewVideoOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [chosenItem, setChosenItem] = useState<string | null>("1");
    const [isLoading, setIsLoading] = useState(true);
    const [isNewLoading, setNewLoading] = useState(false);
    const [videoCommands, setVideoCommands] = useState<any[]>([]);
    const combinedPrompt = `${additionalPrompt}${text}`;
    const { userId } = useAuth();

    useEffect(() => {
        if (userId) {
            fetchVideoCommands();
        }
    }, [userId]);

    const getKeyWord = async (input: string): Promise<string> => {
        try {
            const res = await axios.post<ChatGPTResponse>('/api/chat', {
                messages: [{
                    role: 'user', content: `Analyze the following text and extract the single most important keyword that best represents its core subject matter:
    
    1. The keyword must be specific and highly relevant to the main topic.
    2. It should be a single word, not a phrase.
    3. Avoid generic terms, common verbs, or broad categories (e.g., 'video', 'about', 'presentation', 'thing', 'person').
    4. Prioritize nouns, proper nouns, or technical terms that are central to the subject.
    5. If the text is about a particular field, choose a keyword specific to that domain.
    6. If the text is too vague or broad, choose the most concrete and specific term available.
    7. Ignore any words that don't contribute to the core meaning (e.g., articles, prepositions, conjunctions).
    8. If multiple words seem equally important, choose the most unusual or specific one.
    
    Return only the single keyword, with no additional text or explanation.
    
    Input text: "${input}"`
                }],
            });
            return res.data.choices[0].message.content.trim();
        } catch (error) {
            console.error('Error getting keyword:', error);
            return '';
        }
    };

    const generateImages = async (keyword: string): Promise<string[]> => {
        const URL = `https://pixabay.com/api/videos/?key=${process.env.NEXT_PUBLIC_PIXABAYAPIKEY}&q=${encodeURIComponent(keyword)}&per_page=10`;

        try {
            const response = await axios.get(URL);
            return response.data.hits.map((hit: any) => hit.videos.medium.url);
        } catch (error) {
            console.error('Error fetching videos:', error);
            return [];
        }
    }

    const handleCreateButton = async () => {
        setNewLoading(true);
        setIsNewVideoOpen(false)
        setText("")

        if (!userId) {
            console.error("User not authenticated");
            setNewLoading(false);
            return;
        }

        try {
            const extractedKeyWord = await getKeyWord(text);

            const res = await axios.post<ChatGPTResponse>('/api/chat', {
                messages: [{ role: 'user', content: combinedPrompt }],
            });
            let generatedCode = res.data.choices[0].message.content;

            generatedCode = generatedCode.replace(/```json|```/g, '').trim();
            let parsedCode = JSON.parse(generatedCode);

            const generatedImageUrls = await generateImages(extractedKeyWord);

            if (!parsedCode.backgroundImages) {
                parsedCode.backgroundImages = [];
            }
            parsedCode.backgroundImages = [...parsedCode.backgroundImages, ...generatedImageUrls];

            const updatedCode = JSON.stringify(parsedCode);
            setCode(updatedCode);

            await createProject(userId, text, updatedCode);

            fetchVideoCommands();
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setNewLoading(false);
        }
    }

    const fetchVideoCommands = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`/api/videoCommands?userId=${userId}`);
            setVideoCommands(response.data);
        } catch (error) {
            console.error('Error fetching video commands:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isEditOpen) {
            setIsVisible(true);
        } else {
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 700);

            return () => clearTimeout(timer);
        }
    }, [isEditOpen]);

    useEffect(() => {
        if (isNewVideoOpen) {
            setIsNewVideoOpen(true);
        } else {
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 700);

            return () => clearTimeout(timer);
        }
    }, [isNewVideoOpen]);

    return (
        <div className="flex flex-col min-h-screen bg-white text-black sm:mt-10 md:mt-14 mt-12">
            <NavBar />
            <div className="flex flex-1 relative">
                <aside className={`
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                    transition-transform duration-300 ease-in-out px-6 pt-8
                    fixed md:absolute z-30 w-64 h-full bg-white border-r shadow-lg
                `}>
                    <h2 className="mb-4 text-base font-semibold">History</h2>
                    <ul className="space-y-2">
                        {videoCommands.slice().reverse().map((command, index) => (
                            <li
                                key={command._id || index}
                                onClick={() => {
                                    setChosenItem(command._id);
                                    setCode(command.generatedCode);
                                }}
                                className={`py-2 px-4 rounded-lg overflow-hidden whitespace-nowrap cursor-pointer transition-colors duration-300 ${chosenItem === command._id ? 'bg-purple-500 text-white hover:bg-purple-400' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                            >
                                <div
                                    className={`inline-block ${command.prompt.length > 20 ? 'group-hover:animate-marquee' : ''}`}
                                >
                                    {command.prompt}
                                </div>
                            </li>
                        ))}
                        {isLoading &&
                            <LoadingSpinner />
                        }
                    </ul>

                    <div className="border-t-2 border-gray-200 my-4" />

                    <button onClick={() => setIsNewVideoOpen(true)} className="w-full py-2 px-4 text-left text-gray-600 border-gray-300 border rounded-lg hover:bg-gray-200 hover:text-gray-800 transition-colors duration-300">
                        +  Create new video
                    </button>
                </aside>

                <div
                    className={`
        fixed md:absolute top-1/2 transform -translate-y-1/2
        ${isSidebarOpen ? 'left-64' : 'left-0'}
        transition-all duration-300 ease-in-out z-40
        w-6 h-24 bg-white
        rounded-r-lg shadow-xl cursor-pointer border-t border-b border-r border-gray-400
        flex flex-col items-center justify-center
        hover:bg-gray-200
    `}
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="black"
                        className={`w-5 h-5 transition-transform duration-300 ${isSidebarOpen ? '' : 'rotate-180'}`}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </div>

                <div
                    onClick={() => setIsEditOpen(false)}
                    className={`
    fixed inset-0 flex flex-col items-center justify-center
    bg-white bg-opacity-80 backdrop-blur-sm z-50
    transition-all duration-300 ease-in-out
    ${isEditOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
                >
                    <div
                        className="bg-white p-8 rounded-xl shadow-xl w-11/12 max-w-4xl max-h-[80vh] overflow-y-auto relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <JsonEditor
                            code={code}
                            onUpdate={(newCode) => {
                                setCode(newCode);
                            }}
                        />
                        <button
                            onClick={() => setIsEditOpen(false)}
                            className="absolute top-4 right-4 text-black hover:text-gray-700 transition-colors duration-300 focus:outline-none"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="28"
                                height="28"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                            >
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div
                    onClick={() => setIsNewVideoOpen(false)}
                    className={`
    fixed inset-0 flex flex-col items-center justify-center
    bg-white bg-opacity-80 backdrop-blur-sm z-50
    transition-all duration-300 ease-in-out
    ${isNewVideoOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
  `}
                >
                    <div
                        className="bg-white p-3 rounded-2xl shadow-xl w-11/12 max-w-3xl max-h-[80vh] overflow-y-auto relative flex items-center space-x-2"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Input
                            placeholder="Enter your new video description"
                            onChange={(e) => setText(e.target.value)}
                            className="w-full p-2 border border-gray-300 text-md rounded-md focus:ring-2 focus:ring-purple-500"
                        />
                        <Button onClick={() => handleCreateButton()} type="submit" className="py-4 px-2 bg-purple-600 hover:bg-purple-400 text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8" />
                            </svg>
                        </Button>
                    </div>
                </div>

                < main className={`flex-1 p-4 transition-all duration-300 ease-in-out overflow-hidden ${isSidebarOpen ? 'md:ml-64' : 'ml-0'}`}>
                    <div className="max-w-full overflow-hidden">
                        <div className="relative rounded-lg lg:p-2 py-20 px-2 md:py-0 md:px-0 my-0 bg-purple-100 lg:my-5">
                            <div className="lg:w-3/4 w-auto lg:h-auto h-2/3 mx-auto rounded-lg relative">
                                <Player
                                    component={Main}
                                    inputProps={{ code }}
                                    durationInFrames={900}
                                    compositionWidth={1280}
                                    compositionHeight={720}
                                    fps={30}
                                    controls
                                    style={{
                                        width: '100%',
                                        maxWidth: '100%',
                                        borderRadius: 'inherit',
                                        cursor: 'pointer',
                                        marginLeft: 'auto',
                                        marginRight: 'auto',
                                    }}
                                />
                                <button onClick={() => setIsEditOpen(!isEditOpen)} className="absolute shadow-lg top-2 right-2 p-3 bg-purple-500 rounded-lg hover:bg-purple-300 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" viewBox="0 0 18 18">
                                        <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z" />
                                    </svg>
                                </button>
                                <button
                                    rel="ugc"
                                    onClick={() =>
                                        toast("Not available", {
                                            description: "You can't download videos on a beta-testing stage",
                                            action: {
                                                label: "Close",
                                                onClick: () => console.log("Close"),
                                            },
                                        })
                                    } className="absolute shadow-lg top-16 right-2 p-3 bg-purple-500 rounded-lg hover:bg-purple-300 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" viewBox="0 0 16 16">
                                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                                    </svg>
                                </button>
                                <Toaster />
                            </div>
                        </div>
                        {/* <CanvaLikeScroll /> */}
                        {isNewLoading && <LoadingAnimation />}
                    </div>
                </main >
            </div>
        </div>
    )
}

export default EditorPage