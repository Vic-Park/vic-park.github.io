<template>
  <div
    class="
      flex
      justify-center justify-items-center
      content-center
      items-stretch
      flex-wrap
      mx-28
      my-10
      bg-red-700
    "
  >
    <div
      v-for="club in clubsArray"
      :key="club.slug"
      class="w-1/4 m-8 bg-white hover:bg-red-100 text-red-700 p-4"
    >
      <ClubGalleryCard :name="club.name" :description="club.description" class="" />
    </div>
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
