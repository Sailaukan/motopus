import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from './ui/button';

interface Image {
    id: number;
    previewURL: string;
    webformatURL: string;
    tags: string;
}
const ImageGallery: React.FC = () => {
    const [images, setImages] = useState<Image[]>([]);
    const [query, setQuery] = useState<string>('yellow flowers');

    const handleFindButton = async () => {
        const URL = `https://pixabay.com/api/?key=${process.env.NEXT_PUBLIC_PIXABAYAPIKEY}&q=${encodeURIComponent(query)}&image_type=photo`;

        try {
            const response = await axios.get(URL);
            setImages(response.data.hits);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    return (
        <div>
            <h1>Image Gallery</h1>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for images..."
            />
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {images.map(image => (
                    <div key={image.id} style={{ margin: '10px' }}>
                        <img src={image.webformatURL} alt={image.tags} style={{ width: '200px', height: 'auto' }} />
                    </div>
                ))}
            </div>
            <Button onClick={handleFindButton}>
                Find
            </Button>
        </div>
    );
};

export default ImageGallery;