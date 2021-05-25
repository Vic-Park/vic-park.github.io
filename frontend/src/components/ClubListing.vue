<template>
  <div class="mb-4">
    <router-link
      :to="`/club/${slug}`"
      active-class="text-blue-400"
      class="text-2xl font-bold hover:text-blue-400"
    >
      {{ name }}
    </router-link>
    <div class="text-md">{{ shortDescription }}</div>
  </div>
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
    slug: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },
  },
});
</script>
