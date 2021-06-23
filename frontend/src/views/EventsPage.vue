<template>
  <div class="p-16">
    <EventsCalendar />
    <h1 class="text-4xl font-bold py-8 text-center">Upcoming Club Events</h1>
    <EventListing
      v-for="event in eventsArray"
      :description="event.description"
      :name="event.name"
      :start="event.start.toString()"
      :end="event.end.toString()"
      :slug="event.slug"
      :key="event.slug"
    />
  </div>
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
      start: data.start,
      end: data.end,
      description: data.description,
      information: data.information,
      slug: data.slug,
    }));

    return {
      eventsArray,
    };
  },
});
</script>
