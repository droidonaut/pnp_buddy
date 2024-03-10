<script setup lang="ts">
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { ref, onMounted } from 'vue';
import { useSupabase } from '../../composables/useSupabase';

const { blubb } = useSupabase();

const supabase = createClient('https://nhfhvzzxyggqmpcajkfm.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5oZmh2enp4eWdncW1wY2Fqa2ZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAwNzYzMjEsImV4cCI6MjAyNTY1MjMyMX0.KI3h6_eT7oK3eGOJWKIXLC3mdI1AoG-x5cgENp2lgdQ')
const blah = ref([]);
// async function getCountries() {
    
//     let { data, error } = await supabase
//         .from('weapon')
//         .select('*')
          
//     //const { data } = await supabase.from('weapon').select()
//     //console.log('a', data);
// }

onMounted(async () => {
    // getCountries()
    blah.value = await blubb('weapon');
    console.log(blah);
})
</script>

<template>
    Here will be something
    <div
        v-for="entry in blah"
        :key="entry.id"
    >
        {{ entry.name }}
    </div>
</template>