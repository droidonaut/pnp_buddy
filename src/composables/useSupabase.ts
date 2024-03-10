import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { ref } from 'vue';

export function useSupabase() {
    let supabase: SupabaseClient|null = null;

    const createSupabaseClient = () => {
        supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_TOKEN)
    }

    const getEntries = async (tableName: string) => {
        // getRandom();
        if(!supabase) {
            createSupabaseClient();
        }
        
        const {data} = await supabase.from(tableName).select();
        return data;
    }

    const getArmours = async () => {
        return await getEntries('armour');
    }

    const getWeapons = async () => {
        return await getEntries('weapon');
    }

    const getItems = async () => {
        return await getEntries('item');
    }

    const getRandom =async (type?: string|null) => {
        if(!type) {
            const randomNumber = (Math.random().toString() * 1000).toFixed(0) % 3;
            switch (randomNumber) {
                case 0:
                    type = 'armour';
                    break;
                case 1:
                    type = 'weapon';
                    break;
                default:
                    type = 'item';
            }
        }

        const entries = await getEntries(type);
        const randIndex = Math.floor(Math.random() * entries?.length);
        console.log(entries?.length, randIndex)
        
        const blubb = entries[randIndex]
        console.log('random item', blubb);
        return blubb;
    }

    return { getEntries, getArmours, getWeapons, getItems, getRandom }
}