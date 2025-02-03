import { list } from 'postcss';
import { Database } from '@/app/types/supabase.types';


export type RecommendRow = Database['public']['Tables']['recommendations']['Row']

export type SupabaseRPCOutput = Database['public']['Functions']['similarity']['Returns']

export type RecTableResponse = {
    data: RecommendRow[],
    status: number | null,
    statusText: string | null
}

export type SearchAPIResponse = {
    data: SupabaseRPCOutput | null,
    status: number | null,
    statusText: string | null
}
