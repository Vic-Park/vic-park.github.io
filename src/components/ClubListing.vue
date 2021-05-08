<template>
  <router-link :to="`/club/${slug}`" class="text-md font-bold">{{ name }}</router-link>
  <div class="text-sm">{{ shortDescription }}</div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
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
