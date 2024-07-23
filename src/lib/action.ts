'use server';
import User from "../app/Model/ProjectModel";
import { revalidatePath } from "next/cache";
import { connectToMongoDB } from "./connectDB";

export const createProject = async (userId: string, prompt: string, generatedCode: string) => {
    await connectToMongoDB();

    try {
        const user = await User.findOneAndUpdate(
            { userId: userId },
            {
                $push: {
                    videoCommands: {
                        prompt: prompt,
                        generatedCode: generatedCode,
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
        console.log(error);
        return { message: 'error creating project' };
    }
};