import axios from 'axios';
import { createProject } from '@/lib/action';
import { useRouter } from 'next/navigation';
import { useAuth } from "@clerk/nextjs";
import additionalPrompt from '@/app/api/claude/additionalPrompt';

interface ChatGPTResponse {
    choices: Array<{ message: { content: string } }>;
}

export const getKeyWord = async (input: string): Promise<string> => {
    try {
        const res = await axios.post<ChatGPTResponse>('/api/chat', {
            messages: [{ role: 'user', content: `Extract the main keyword from this text: "${input}". Return only the keyword, nothing else.` }],
        });
        return res.data.choices[0].message.content.trim();
    } catch (error) {
        console.error('Error getting keyword:', error);
        return '';
    }
};

export const generateImages = async (keyword: string): Promise<string[]> => {
    const URL = `https://pixabay.com/api/videos/?key=${process.env.NEXT_PUBLIC_PIXABAYAPIKEY}&q=${encodeURIComponent(keyword)}&per_page=10`;

    try {
        const response = await axios.get(URL);
        return response.data.hits.map((hit: any) => hit.videos.medium.url);
    } catch (error) {
        console.error('Error fetching videos:', error);
        return [];
    }
};

export const handleSubmit = async (text: string, setText: React.Dispatch<React.SetStateAction<string>>, setCode: React.Dispatch<React.SetStateAction<string>>, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
    setLoading(true);
    const router = useRouter();
    const { userId } = useAuth();

    if (!userId) {
        console.error("User not authenticated");
        setLoading(false);
        return;
    }

    try {
        const extractedKeyWord = await getKeyWord(text);
        const combinedPrompt = `${additionalPrompt}${text}`;
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

        router.push('/Editor');
    } catch (error) {
        console.error('Error:', error);
    } finally {
        setLoading(false);
    }
};
