'use server';
import { getOpenAIClient, getSupabaseClient } from '@/app/config/config';
import { SearchAPIResponse } from '@/app/types/global.types'; 
import { CreateEmbeddingResponse } from 'openai/resources/embeddings.mjs';

async function generateMovieEmbedding(userResponse : string, modelName: string="text-embedding-3-small") : Promise<number[]> {
    const openai = await getOpenAIClient();
    const response: CreateEmbeddingResponse = await openai.embeddings.create({
        model: modelName,
        input: userResponse,
        encoding_format: "float",
        });
    const [{ embedding} ] = response.data;

    return embedding;
}

/* Search supabase for similar movies based on user response embedding */
export async function similaritySearch(response1: string, response2: string, response3: string): Promise<SearchAPIResponse> {
    const supabase = await getSupabaseClient();
    const userResponse = response1 + " " + response2 + " " + response3;
    const embedding: number[] = await generateMovieEmbedding(userResponse);
    
    console.log(embedding);
    const {data, status, statusText} = await supabase.rpc('similarity', {
        query_embedding: embedding,
        match_threshold: 1.0,
        match_count: 1
    });
    
    if (statusText === 'OK' && data !== null) {
        console.log(data)
    }
    
    console.log(status);

    return {data, status, statusText}
}

// const response1 = "My favorite movie is Shutter Island. It is both a thriller with an amazing plot twist. It is not a typical horror/thriller movie."
// const response2 = "I would be interested in a classic movie, not something new.";
// const response3 = "I am interested in a serious movie";
// const responseSearch = await similaritySearch({response1 : response1, response2 : response2, response3: response3});