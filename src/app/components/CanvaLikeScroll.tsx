export const CanvaLikeScroll = () => {
    return (
        <div>
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
    )
}