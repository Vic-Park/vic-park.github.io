<template>
  <div class="mt-8 mb-16">
    <div id="clubs" class="flex flex-wrap justify-center max-w-3card mx-8">
      <ClubGalleryCard
        v-for="club in clubsArray"
        :key="club.slug"
        :name="club.name"
        :description="club.description"
        :slug="club.slug"
      />
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
