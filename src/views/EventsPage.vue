<template>
  <EventsCalendar />
  <h1 class="text-4xl font-bold py-8 text-center">Upcoming Club Events</h1>
  <EventListing v-for="event in eventsArray" v-bind="event" :key="event.slug" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import EventListing from '~/components/EventListing.vue';
import EventsCalendar from '~/components/EventsCalendar.vue';
import events from '~data/events';

export default defineComponent({
  components: { EventsCalendar, EventListing },
  setup() {
    const eventsArray = Object.values(events).map(({ data }) => ({
      name: data.name,
      date: data.date,
      startTime: data.startTime,
      endTime: data.endTime,
      description: data.description,
      slug: data.slug,
    }));

    return {
      eventsArray,
    };
  },
});
</script>
