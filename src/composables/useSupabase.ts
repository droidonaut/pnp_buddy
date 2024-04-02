import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { ref } from 'vue';

export function useSupabase() {
    let supabase: SupabaseClient|null = null;

    const createSupabaseClient = () => {
        supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_TOKEN)
    }

    const getEntries = async (tableName: string, diceValue: number) => {
        // getRandom();
        if(!supabase) {
            createSupabaseClient();
        }
        const rarity = getRarity();
        
        const {data} = await supabase
            .from(tableName)
            .select()
            .lte('dice_value', diceValue)
            .eq('rarity', rarity);
        return data;
    }

    const getArmours = async (diceValue: number) => {
        return await getEntries('armour', diceValue);
    }

    const getWeapons = async (diceValue: number) => {
        return await getEntries('weapon', diceValue);
    }

    const getItems = async (diceValue: number) => {
        return await getEntries('item', diceValue);
    }

    const getRandom =async (value: number, type?: string|null) => {
        if(!type) {
            const randomNumber: number = (Math.random() * 1000).toFixed(0) % 3;
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

        const entries = await getEntries(type, value);
        const randIndex = Math.floor(Math.random() * entries?.length ?? 1);
        
        return entries[randIndex];
    }

    const getRarity = () => {
        const randomNumber = Math.floor(Math.random() * (100) + 1);
        if (randomNumber < 50) {
            return 1;
        } else if (randomNumber < 80) {
            return 2;
        } else if (randomNumber < 95) {
            return 3;
        } else {
            return 4;
        }
    }

    return { getEntries, getRandom }
}