<script setup lang="ts">
import { ref } from 'vue';
import { useSupabase } from '../../composables/useSupabase';
import Item from './Item.vue';

const { getRandom } = useSupabase();

const lootedItems = ref([]);
const selectedDiceValue = ref<number|null>();
const leftValue = ref<number>(0);

const getRandomLoot = async (value: number, type?: string|null) => {
    // reset previous selection
    lootedItems.value = [];
    leftValue.value = 0;
    selectedDiceValue.value = value;
    // initialize help variables
    let lootedValue = 0;
    let retries = 5;
    while (lootedValue < value) {
        // returns when retires are exeeded to prevent infinite loop
        if( retries <= 0 ) {
            leftValue.value += (value - lootedValue);
            return;
        }
        const lootedItem = await getRandom(value - lootedValue, type);
        // when no item is found allow some retires for maybe different table/rarity
        if(!lootedItem) {
            retries--;
            continue;
        }
        // decide if item or money is found while money is the `dice_value` ofthe item
        if(!!(Math.floor(Math.random() * 10 + 1) % 2)) {
            leftValue.value += lootedItem['dice_value'];
            lootedValue += lootedItem['dice_value'];
            continue;
        }
        lootedItems.value.push(lootedItem);
        lootedValue += lootedItem['dice_value'];
    }
}
</script>

<template>
    <div class="p-10">
        <img src="../../assets/img/logo.svg" class="px-10 pb-5">

        <div class="flex w-full flex-wrap pb-6">
            <button 
                v-for="i in 20" 
                :key="`loot-button-${i}`"
                @click="getRandomLoot(i)"
                class="basis-1/5 p-2"
            >
                <div 
                    class="py-2 rounded font-semibold"
                    :class=" i === selectedDiceValue ? 'bg-secondary text-primary shadow-lg' : 'bg-primary text-white'"
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
        class="mx-2 text-2xl font-bold text-right"
    >
        {{ leftValue }} Stands
    </div>
    </div>
</template>

<style>
</style>