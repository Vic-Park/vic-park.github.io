<template>
  <router-link :to="`/event/${slug}`" class="text-2xl font-bold hover:text-blue-400">
    {{ name }}
  </router-link>
  <div class="text-sm">{{ date }} ({{ startTime }} - {{ endTime }})</div>
  <div class="text-md pt-2">{{ description }}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ClubListing',
  props: {
    name: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
  },
});
</script>
