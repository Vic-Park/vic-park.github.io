<template>
  <div id="clubs" class="flex gap-4 flex-wrap justify-items-stretch p-4 my-4 max-w-6xl bg-red-700">
    <ClubGalleryCard
      v-for="club in clubsArray"
      :key="club.slug"
      :name="club.name"
      :description="club.description"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import ClubGalleryCard from '~/components/ClubGalleryCard.vue';
import clubs from '~data/clubs';

export default defineComponent({
  components: { ClubGalleryCard },
  setup() {
    const clubsArray = Object.values(clubs).map(({ data }) => ({
      name: data.name,
      description: data.shortDescription,
    }));

    return {
      clubsArray,
    };
  },
});
</script>
