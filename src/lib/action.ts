'use server';
import User from "../app/Model/ProjectModel";
import { revalidatePath } from "next/cache";
import { connectToMongoDB } from "./connectDB";

export const createProject = async (userId: string, prompt: string, generatedCode: string) => {
    await connectToMongoDB();

    try {
        const parsedCode = JSON.parse(generatedCode);
        const backgroundImages = parsedCode.backgroundImages || [];

        const user = await User.findOneAndUpdate(
            { userId: userId },
            {
                $push: {
                    videoCommands: {
                        prompt: prompt,
                        generatedCode: generatedCode,
                        backgroundImages: backgroundImages
                    }
                }
            },
            { upsert: true, new: true }
        );

        if (!user) {
            throw new Error('User not found or created');
        }

        revalidatePath("/");

        return user ? user.toString() : null;

    } catch (error) {
        console.error("Error creating project:", error);
        return { message: 'Error creating project' };
    }
};