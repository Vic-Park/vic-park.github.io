<template>
  <template v-if="found">
    <h1 class="font-bold text-center text-5xl pb-2">{{ name }}</h1>
    <div class="text-xl text-center pb-4">{{ startDateString }} - {{ endDateString }}</div>

    <h2 class="font-bold text-2xl">Description</h2>
    <div class="pt-1 text-md">{{ description }}</div>

    <h2 class="font-bold text-2xl pt-4">Information</h2>
    <div class="pt-1 text-md">{{ information }}</div>
  </template>
  <div v-else>
    Sorry, no club exists at this URL. However, you can start your own!
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';

import { formatFullDateTime } from '~/utils/date';
import events from '~data/events';

export default defineComponent({
  name: 'ClubPage',
  setup() {
    const route = useRoute();

    const eventSlug = route.params.eventSlug.toString();
    if (events[eventSlug] === undefined) {
      return {
        found: false,
      };
    }

    const { name, description, information, start, end, slug } = events[eventSlug].data;
    const startDateString = formatFullDateTime(start);
    const endDateString = formatFullDateTime(end);

    return {
      found: true,

      name,
      description,
      startDateString,
      endDateString,
      information,
      slug,
    };
  },
});
</script>
