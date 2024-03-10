<script setup lang="ts">
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { ref, onMounted } from 'vue';
import { useSupabase } from '../../composables/useSupabase';

const { getEntries, getRandom } = useSupabase();

const blah = ref([]);

const lootedItem = ref();

onMounted(async () => {
    //blah.value = await getEntries('weapon');
    getRandom()
})

const getRandomLoot = async (type?: string|null) => {
    lootedItem.value = await getRandom(type);
    // console.log(lootedItem)
}
</script>

<template>
    <button @click="getRandomLoot()"> random loot </button>
    <button @click="getRandomLoot('armour')"> random armour </button>
    <button @click="getRandomLoot('weapon')"> random weapon </button>
    <button @click="getRandomLoot('item')"> random loot </button>
    <!-- <div
        v-for="entry in blah"
        :key="entry.id"
    >
        {{ entry.name }}
    </div> -->
    <div v-if="lootedItem">{{ lootedItem.name }}</div>
</template>