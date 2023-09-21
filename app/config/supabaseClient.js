"use client";
import { createClient } from '@supabase/supabase-js';

const key = process.env.NEXT_PUBLIC_ANON_KEY;
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;

const supabase = createClient(url, key);

export default supabase;