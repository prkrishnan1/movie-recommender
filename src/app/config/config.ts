'use server';
import OpenAI from 'openai';
import { createClient } from "@supabase/supabase-js";
// import {config as dotenvConfig} from 'dotenv';
import { Database } from '@/app/types/supabase.types';

export async function getOpenAIClient(): Promise<OpenAI> {
  /** OpenAI config */
  if (!process.env.OPENAI_API_KEY) throw new Error(`OpenAI API key is missing or invalid.`);
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
  });
  return openai
}

export async function getSupabaseClient(): Promise<any> {
  /** Supabase config */
  const privateKey = process.env.SUPABASE_API_KEY;
  if (!privateKey) throw new Error(`Expected env var SUPABASE_API_KEY`);
  const url = process.env.SUPABASE_URL;
  if (!url) throw new Error(`Expected env var SUPABASE_URL`);
  const supabase = createClient<Database>(url, privateKey);
  return supabase;
}

