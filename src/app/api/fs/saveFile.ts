import { writeFile } from 'fs/promises';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { fileName, content } = req.body;

    if (!fileName || !content) {
        return res.status(400).json({ error: 'File name and content are required' });
    }

    try {
        const filePath = path.join(process.cwd(), 'src', 'app', 'components', `${fileName}.tsx`);
        await writeFile(filePath, content);

        res.status(200).json({
            message: 'File saved successfully',
            path: `/components/${fileName}.tsx`
        });
    } catch (error) {
        console.error('Error saving file:', error);
        res.status(500).json({ error: 'Failed to save file' });
    }
}