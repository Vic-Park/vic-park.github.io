<template>
  <router-link :to="to" active-class="text-blue-400">
    <div class="text-lg font-bold hover:text-blue-400">{{ title }}</div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
  },
});
</script>
