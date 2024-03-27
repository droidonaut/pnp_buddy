<script setup lang="ts">
import { ref } from 'vue';
import { useSupabase } from '../../composables/useSupabase';
import Item from './Item.vue';

const { getRandom } = useSupabase();

const lootedItems = ref([]);
const selectedDiceValue = ref<number|null>();
const leftValue = ref<number>(0);

const getRandomLoot = async (value: number, type?: string|null) => {
    lootedItems.value = [];
    leftValue.value = 0;
    selectedDiceValue.value = value;
    let lootedValue = 0;
    let retries = 5;
    while (lootedValue < value) {
        if( retries <= 0 ) {
            leftValue.value += (value - lootedValue);
            return;
        }
        const lootedItem = await getRandom(value - lootedValue, type);
        if(!lootedItem) {
            retries--;
            continue;
        }
        if(!!(Math.floor(Math.random() * 10 + 1) % 2)) {
            leftValue.value += lootedItem['dice_value']
        lootedValue += lootedItem['dice_value'];
            continue;
        }
        lootedItems.value.push(lootedItem);
        lootedValue += lootedItem['dice_value'];
    }
}
</script>

<template>
    <div class="flex w-full flex-wrap pb-6">
        <button 
            v-for="i in 20" 
            :key="`loot-button-${i}`"
            @click="getRandomLoot(i)"
            class="basis-1/5 p-2"
        >
            <div 
                class="bg-black py-2 rounded"
                :class=" i === selectedDiceValue ? 'bg-emerald-900' : 'bg-neutral-950 opacity-60'"
            >
                {{ i }}
            </div>
        </button>
    </div>

    <div
        v-if="lootedItems"
        class="flex gap-2 flex-col pb-6"
    >
        <template 
            v-for="item in lootedItems"
        >
            <Item :item="item" />
        </template>
    </div>
    <div
        v-if="leftValue"
        class="mx-2"
    >
        übrig: {{ leftValue }}
    </div>
</template>

<style>
</style>