<template>
  <router-link
    :to="`/club/${slug}`"
    active-class="text-blue-400"
    class="text-md font-bold hover:text-blue-400"
  >
    {{ name }}
  </router-link>
  <div class="text-sm">{{ shortDescription }}</div>
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
