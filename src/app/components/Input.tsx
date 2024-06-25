const Input = () => {
    return (
        <div className="bg-primary text-primary-foreground py-20 md:py-20 lg:py-24">
            <div className="container px-4 md:px-6">
                <div className="max-w-3xl mx-auto text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">Motopus</h1>
                    <p className="text-lg md:text-xl lg:text-2xl text-primary-foreground/80">
                        Unleash your creativity with our powerful AI-driven platform.
                    </p>
                    <div className="flex justify-center">
                        <div className="relative w-full max-w-md">
                            <input
                                className="flex w-full border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pr-20 h-12 md:h-14 lg:h-16 rounded-full"
                                placeholder="Enter your prompt..."
                                type="text"
                            />
                            <button
                                className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 py-2 absolute right-1 top-1/2 -translate-y-1/2 h-10 md:h-12 lg:h-14 px-6 rounded-full"
                                type="submit"
                            >
                                Generate
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Input;