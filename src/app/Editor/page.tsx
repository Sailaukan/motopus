'use client'

import { Player } from "@remotion/player";
import useCodeStore from "../zustand/States";
import { Main } from "../remotion/Root";
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import NavBar from "../components/NavBar";
import axios from 'axios';
import { useAuth } from "@clerk/nextjs";

const EditorPage: React.FC = () => {

    const code = useCodeStore(state => state.code);
    const setCode = useCodeStore(state => state.setCode);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [chosenItem, setChosenItem] = useState<string | null>("1");
    const router = useRouter();

    const [videoCommands, setVideoCommands] = useState<any[]>([]);
    const { userId } = useAuth();

    useEffect(() => {
        if (userId) {
            fetchVideoCommands();
        }
    }, [userId]);

    const fetchVideoCommands = async () => {
        try {
            const response = await axios.get(`/api/videoCommands?userId=${userId}`);
            setVideoCommands(response.data);

        } catch (error) {
            console.error('Error fetching video commands:', error);
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
                        {videoCommands.map((command, index) => (
                            <li
                                key={command._id || index}
                                onClick={() => {
                                    setChosenItem(command._id);
                                    setCode(command.generatedCode);
                                }}
                                className={`py-2 px-4 rounded-lg overflow-hidden whitespace-nowrap cursor-pointer transition-colors duration-300 ${chosenItem === command._id ? 'bg-purple-500 text-white hover:bg-purple-400' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}

                            >
                                <div
                                    className={`inline-block ${command.prompt > 20 ? 'group-hover:animate-marquee' : ''}`}
                                >
                                    {command.prompt}
                                </div>

                            </li>
                        ))}
                    </ul>


                    <div className="border-t-2 border-gray-200 my-4" />

                    <button className="w-full py-2 px-4 text-left text-gray-600 border-gray-300 border rounded-lg hover:bg-gray-200 hover:text-gray-800 transition-colors duration-300">
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

                {isVisible && (
                    <div
                        onClick={() => setIsEditOpen(false)}
                        className={`
            fixed inset-0 flex items-center sm:items-start justify-center
            bg-white bg-opacity-80 backdrop-blur-sm z-50
            transition-all duration-300 ease-in-out
            ${isEditOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
        `}
                    >
                        <div
                            className="bg-white p-3 rounded-xl shadow-xl w-11/12 max-w-2xl mt-4 sm:mt-16 md:mt-24"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="text"
                                    placeholder="Improve your video"
                                    className="flex-grow text-lg py-6 px-4 rounded-lg"
                                />
                                <button
                                    onClick={() => setIsEditOpen(false)}
                                    className="p-2 bg-purple-500 rounded-lg hover:bg-purple-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 flex-shrink-0"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                )}

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
                            </div>
                        </div>

                        <div className="border-t-2 border-gray-200 my-4"></div>

                        <div className="mt-4 overflow-x-auto">
                            <div className="w-full rounded-lg border">
                                <div className="whitespace-nowrap">
                                    <div className="inline-flex space-x-2 p-2">
                                        <div className="relative p-3 w-32 lg:w-36 h-20 bg-gray-100 rounded-md hover:bg-gray-200 hover:scale-105 transition transform duration-200 ease-in-out cursor-pointer">
                                            <span className="absolute bottom-0 left-0 px-2 py-1 m-1 text-xs bg-black bg-opacity-50 text-white rounded">1</span>
                                        </div>

                                        <div className="relative p-3 w-32 lg:w-36 h-20 rounded-md cursor-pointer text-gray-400 border-gray-200 border-2 hover:scale-105 transition transform duration-200 flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 18 18">
                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main >
            </div>
        </div>
    )
}

export default EditorPage