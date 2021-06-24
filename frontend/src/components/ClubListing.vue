<template>
  <router-link :to="`/club/${slug}`" class="hover:text-burgundy" active-class="text-blue-400">
    <div class="mb-4 flex w-full justify-between items-center border-2 p-8 rounded-md">
      <div class="flex-shrink">
        <div class="text-2xl font-bold">{{ name }}</div>
        <div class="text-md">{{ shortDescription }}</div>
      </div>
      <div class="ml-4">
        <vue-icon :icon="mdiChevronRight" size="40px"></vue-icon>
      </div>
    </div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mdiChevronRight } from '@mdi/js';

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
  setup() {
    return {
      mdiChevronRight,
    };
  },
});
</script>
