import { createClient } from "@supabase/supabase-js";

const supabaseURL = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;

if (!supabaseKey || !supabaseURL) {
	throw new Error("Missing supabase url or key");
}

export const supabase = createClient(supabaseURL, supabaseKey);
