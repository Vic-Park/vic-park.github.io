<template>
  <div
    id="clubs"
    class="
      2card:flex 2card:flex-wrap
      2card:justify-center
      2card:w-2card
      3card:w-3card
      p-3
      mb-16
      mx-8
      bg-burgundy
    "
  >
    <ClubGalleryCard
      v-for="club in clubsArray"
      :key="club.slug"
      :name="club.name"
      :description="club.description"
      :slug="club.slug"
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
    const clubsArray = Object.entries(clubs).map(([name, { data }], key) => ({
      slug: data.slug,
      name: data.name,
      description: data.shortDescription,
    }));

    return {
      clubsArray,
    };
  },
  methods: {
    scrollRight(event: any) {
      event.target.parentElement.childNodes[1].scrollLeft += 1000;
    },
    scrollLeft(event: any) {
      event.target.parentElement.childNodes[1].scrollLeft -= 1000;
    },
  },
});
</script>
