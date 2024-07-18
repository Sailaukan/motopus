'use client'

import { Player } from "@remotion/player"
import NavBar from "../components/NavBar"
import { Main } from "../remotion/Root"
import React, { useState } from 'react';

const EditorPage: React.FC = () => {

    const [code, setCode] = useState<string>('');

    return (
        <div className="flex flex-col min-h-screen bg-white text-black">
            <NavBar />
            <div className="flex flex-1">
                <aside className="w-64 p-4 bg-white border-r">
                    <h2 className="mb-4 text-lg font-semibold">History</h2>
                    <ul className="space-y-2">
                        <li className="p-2 bg-gray-100 rounded">Preview for Instagram story</li>
                        <li className="p-2 bg-gray-100 rounded">Colorful background</li>
                        <li className="p-2 bg-gray-100 rounded">Bold text</li>
                        <li className="p-2 bg-blue-500 text-white rounded">Dynamic animations</li>
                    </ul>
                    <button className="w-full mt-4 p-2 text-left bg-gray-100 rounded">+ Create new video</button>
                </aside>
                <main className="flex-1 p-4">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
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
                                className="w-6 h-6 text-gray-500"
                            >
                                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                            <input
                                className="p-2 bg-gray-100 rounded"
                                type="text"
                                value="Preview for Instagram story with dynamic animations"
                            />
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
                                className="w-6 h-6 text-gray-500"
                            >
                                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
                                <path d="M21 3v5h-5"></path>
                                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
                                <path d="M8 16H3v5"></path>
                            </svg>
                        </div>
                        <button className="p-2 bg-blue-500 text-white rounded">Download</button>
                    </div>
                    <div className="relative bg-white rounded-lg shadow">
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
                                aspectRatio: '16/9',
                            }}
                        />
                    </div>
                    <div className="flex mt-4 space-x-2">
                        <div className="relative w-24 h-16 bg-gray-100 rounded-lg">
                            <img
                                src="/placeholder.svg"
                                alt="Motion"
                                className="w-full h-full object-cover rounded-lg"
                                width="96"
                                height="64"
                            />
                            <span className="absolute bottom-0 left-0 p-1 text-xs bg-black bg-opacity-50 text-white rounded">1</span>
                        </div>
                        <div className="relative w-24 h-16 bg-gray-100 rounded-lg">
                            <img
                                src="/placeholder.svg"
                                alt="Motion"
                                className="w-full h-full object-cover rounded-lg"
                                width="96"
                                height="64"
                            />
                            <span className="absolute bottom-0 left-0 p-1 text-xs bg-black bg-opacity-50 text-white rounded">2</span>
                        </div>
                        <div className="relative w-24 h-16 bg-gray-100 rounded-lg"></div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default EditorPage