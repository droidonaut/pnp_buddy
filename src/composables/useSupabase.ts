import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { ref } from 'vue';

export function useSupabase() {
    let supabase: SupabaseClient|null = null;

    const createSupabaseClient = () => {
        supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_TOKEN)
    }

    const blubb = async (tableName: string) => {
        console.log(import.meta.env)
        if(!supabase) {
            createSupabaseClient();
        }
        
        const {data} = await supabase.from(tableName).select();
        console.log(data);
        return data;
    }

    return { blubb }
}