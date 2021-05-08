<template>
  <div class="flex flex-col items-start px-8">
    <h1 class="text-5xl font-bold self-center pb-4">Club List</h1>

    <div class="pb-2" v-for="club in clubsArray" :key="club.slug">
      <ClubListing :name="club.name" :shortDescription="club.shortDescription" :slug="club.slug" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ClubListing from '~/components/ClubListing.vue';
import clubs from '~data/clubs';

export default defineComponent({
  components: { ClubListing },
  setup() {
    const clubsArray = Object.values(clubs).map(({ data }) => data);

    return {
      clubsArray,
    };
  },
});
</script>
