<template>
  <h1 class="list-title">Club Index</h1>

  <ClubListing
    v-for="club in clubsArray"
    :name="club.name"
    :shortDescription="club.shortDescription"
    :slug="club.slug"
    :key="club.slug"
  />
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
