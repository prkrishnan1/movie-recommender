import { getOpenAIClient } from '@/app/config/config';

export async function formChatCompletion(userResponse: string, movieDescription: string): Promise<string | null> {
    const openai = await getOpenAIClient();
    const developerPrompt: string = "You are an AI for movie recommendations. Your job is to recommend the right movie to the user. \
                    You will receive 2 pieces of information: \
                    1. A response from a user describing their favorite movie and why. A response describing whether the user wants to watch a classic or new movie. A response describing whether the user wants to watch a funny or serious movie.\
                    2. A movie title, along with a description of the movie. \
                    You must write a 2 - 3 sentence explanation for why the user will like this movie, incorporating the user's response and the movie description";
    
    const userPrompt: string = `1. ${userResponse} \
                                2. ${movieDescription}`

    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "developer", content: developerPrompt },
            {
                role: "user",
                content: userPrompt,
            },
        ],
        store: false,
    });
    
    console.log(completion.choices[0].message);                
    return completion.choices[0].message.content
}