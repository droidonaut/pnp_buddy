<script setup lang="ts">
const props = defineProps<{
    item: any;
}>();
</script>

<template>
    <div 
        class="mx-2 p-6 flex gap-5 flex-col border-2 border-t-8 rounded-2xl bg-light"
        :class="{
            'border-primary': item.rarity === 1,
            'border-green': item.rarity === 2,
            'border-orange': item.rarity === 3,
            'border-gold': item.rarity === 4
        }"
    >
        <div class="w-full flex justify-between">
            <div
                class="font-bold text-2xl"
            >
                {{ item.name }}
            </div>
            <div class="font-bold text-lg bg-white px-3 py-1 rounded-lg" v-if="item.defense">
                Rüstung: +{{ item.defense }}
            </div>
            <div class="font-bold text-lg bg-white px-3 py-1 rounded-lg" v-else-if="item.attack">
                Schaden: +{{ item.attack }}
            </div>
        </div>
        <div class="text-xs italic max-w-96">{{ item.description }}</div>
        <div v-if="item.bonus">
            <div
                v-for="(b, key) in item.bonus" 
                class="font-bold text-lg"
            >
                {{ key }}: {{ b }}
            </div>
        </div>
        <!--<div class="w-full flex justify-between">
            <div class="item-diceValue">Würfelwert: {{ item['dice_value'] }}</div>
            <div class="item-priceValue">Preis: {{ item['price_value'] }}</div>
        </div>-->
    </div>
</template>