<template>
  <template v-if="found">
    <h1 class="font-bold text-center text-5xl pb-2">{{ name }}</h1>
    <div class="text-xl text-center pb-4">{{ date }} ({{ startTime }} - {{ endTime }})</div>

    <h2 class="font-bold text-2xl">Description</h2>
    <div class="pt-1 text-md">{{ description }}</div>

    <div class="pt-3">
      <div class='text-xl font-bold pb-1'>Information</div>
      {{ moreInfo }}
    </div>
  </template>
  <div v-else>
    Sorry, no club exists at this URL. However, you can start your own!
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';

import events from '~data/events';

export default defineComponent({
  name: 'ClubPage',
  setup() {
    const $route = useRoute();

    const eventSlug = $route.params.eventSlug.toString();
    if (events[eventSlug] === undefined) {
      return {
        found: false,
      };
    }

    const { description, endTime, startTime, date, name, moreInfo, slug } = events[eventSlug].data;

    return {
      found: true,

      name,
      description,
      endTime,
      startTime,
      date,
      slug,
      moreInfo,
    };
  },
});
</script>
