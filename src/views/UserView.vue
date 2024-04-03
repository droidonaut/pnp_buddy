<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useSupabase } from '../composables/useSupabase';
import { useRoute } from 'vue-router'

const route = useRoute()

console.log(route.params.id);
const { getUser } = useSupabase();

/*
console.log( await getUser(route.params.id))
const user = ref(null);
user.value = await getUser(route.params.id);
//console.log(await getUser(route.params.id));

const user = computed(async () => await getUser(route.params.id))
const user = ref()

// fetch the user information when params change
watch(
  () => route.params.id,
  async newId => {
    user.value = await getUser(newId)
    console.log(user.value);
    
  }
)
*/
</script>

<template>
  <Suspense>

    <div class="about">
      <div v-if="user">

        hallo {{ user.name }}
      </div>
      <h1>This is an user page for User {{ $route.params.id }}</h1>
    </div>
  </Suspense>
</template>