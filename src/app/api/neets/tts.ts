import fetch from 'node-fetch';

interface FetchResponse {
    body: NodeJS.ReadableStream;
    ok: boolean;
    status: number;
    json(): Promise<any>;
}

export async function generateAudioNeets(voice_id: string, script: string) {
    const options = {
        method: 'POST',
        headers: {
            'accept': 'audio/wav',
            'content-type': 'application/json',
            'X-API-Key': process.env.NEXT_PUBLIC_NEETS_API_KEY as string,
        },
        body: JSON.stringify({
            text: script,
            voice_id: voice_id,
            params: {
                model: 'ar-diff-50k',
            },
        }),
    };

    try {
        const response: FetchResponse = await fetch('https://api.neets.ai/v1/tts', options);

        if (!response.ok) {
            throw new Error(`Server responded with status code ${response.status}`);
        }

        const responseData = await response.json();
        console.log(responseData);

        // Assuming the response contains a link to the audio file
        const audioUrl = responseData.audio_url;
        if (audioUrl) {
            console.log(`Audio file saved to ${audioUrl}`);
        } else {
            console.log('Audio URL not found in the response');
        }
    } catch (err) {
        console.error(err);
    }
}
