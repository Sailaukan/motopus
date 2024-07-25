'use client';

import { useState } from 'react';
import axios from 'axios';

const ImageGenerator = () => {
    const [prompt, setPrompt] = useState('');
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const generateImages = async () => {
        setLoading(true);
        setError(null);
        setImageUrls([]);

        try {
            const response = await axios.post('/api/openai', { prompt });
            const { data } = response;

            if (data && data.data && data.data.length > 0) {
                const urls = data.data.map((item: { url: string }) => item.url);
                setImageUrls(urls);
                console.log(urls);
            } else {
                setError('Failed to generate images');
            }
        } catch (error) {
            console.error(error);
            setError('Failed to generate images');
        }
        setLoading(false);
    };

    return (
        <div>
            <h1>Image Generator</h1>
            <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your prompt"
            />
            <button onClick={generateImages} disabled={loading}>
                {loading ? 'Generating...' : 'Generate Images'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {imageUrls.map((url, index) => (
                    <img key={index} src={url} alt={`Generated ${index + 1}`} style={{ margin: '10px', maxWidth: '300px' }} />
                ))}
            </div>
        </div>
    );
};

export default ImageGenerator;