'use server';
import { getSupabaseClient } from '@/app/config/config';
import { similaritySearch } from '@/app/components/server/similaritySearch';
import { formChatCompletion } from '@/app/components/server/chatCompletions';
import { SearchAPIResponse, RecTableResponse } from '@/app/types/global.types.ts';

export interface MovieRec {
    id: number,
    title: string,
    explanation: string
}

export async function getMovieRec(): Promise<MovieRec> {
    const supabase = await getSupabaseClient();
    const { data, status, statusText }: RecTableResponse = await supabase.from('recommendations').select();
    
    let movieTitle: string | null = "default";
    let response: string | null = "default";

    console.log(status);
    console.log(statusText);
    console.log(data);
    if (data === null || statusText !== 'OK' || data.length !== 1 || data[0]["title"] === null || data[0]["explanation"] === null) {
        return {id: 1, title: movieTitle, explanation: response}
    }

    movieTitle = data[0]['title'];
    response = data[0]['explanation'];

    return {id: 1, title: movieTitle, explanation: response};
}

export async function insertMovieRec(rec: MovieRec): Promise<void> {
    const supabase = await getSupabaseClient();
    const { error, status, statusText } = await supabase.from('recommendations').upsert(rec);
    console.log("Inserting Movie Rec!");
    console.log(status);
    console.log(statusText);
    console.log(error);
}

export async function deleteMovieRec(): Promise<void> {
    const supabase = await getSupabaseClient();
    const response = await supabase.from('recommendations').delete().eq('id', 1);
    console.log("Deleting Movie Rec!");
    console.log(response)
}
export async function computeMovieRec(response1: string, response2: string, response3: string): Promise<MovieRec> {
    let movieTitle = "";
    let finalResponse = "";

    if (response1 && response2 && response3) {
        const responseSearch: SearchAPIResponse = await similaritySearch(response1, response2, response3);
        
        if (responseSearch.data !== null) {
            let userResponse = response1 + ' ' + response2 + ' ' + response3;
            let movieDescription = responseSearch.data[0].description;
            let chatResponse: string | null = "";
            if (movieDescription) {
                chatResponse = await formChatCompletion(userResponse, movieDescription);
            }
            if (chatResponse && responseSearch.data[0].title) {
                finalResponse = chatResponse;
                movieTitle = responseSearch.data[0].title;
            }
        }
        else {
            throw new Error(`Response from Supabase: ${responseSearch.status} ${responseSearch.statusText}`);
        }
    }
    else {
        throw new Error("Responses from user are null/undefined");
    }


    return {id: 1, title: movieTitle, explanation: finalResponse}
}
