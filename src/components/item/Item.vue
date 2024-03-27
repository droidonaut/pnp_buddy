<script setup lang="ts">
const props = defineProps<{
    item: any;
}>();
</script>

<template>
    <div 
        class="mx-2 p-3 flex gap-5 flex-col border-2"
        :class="{
            'border-slate-800': item.rarity === 1,
            'border-lime-500': item.rarity === 2,
            'border-blue-900': item.rarity === 3,
            'border-orange-600': item.rarity === 4
        }"
    >
        <div class="w-full flex justify-between">
            <div
                class="font-bold"
            >
                {{ item.name }}
            </div>
            <div v-if="item.defense">
                Def: {{ item.defense }}
            </div>
            <div v-else-if="item.attack">
                Atk: {{ item.attack }}
            </div>
        </div>
        <div>{{ item.description }}</div>
        <div v-if="item.bonus">
            <div
                v-for="(b, key) in item.bonus" 
                class=""
            >
                {{ key }}: {{ b }}
            </div>
        </div>
        <div class="w-full flex justify-between">
            <div class="item-diceValue">Würfelwert: {{ item['dice_value'] }}</div>
            <div class="item-priceValue">Preis: {{ item['price_value'] }}</div>
        </div>
    </div>
</template>