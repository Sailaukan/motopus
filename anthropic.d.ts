declare module 'anthropic' {
    export class Anthropic {
        constructor(config: { apiKey: string });
        completions: {
            create(params: {
                model: string;
                max_tokens_to_sample: number;
                prompt: string;
            }): Promise<{ completion: string }>;
        };
    }
}