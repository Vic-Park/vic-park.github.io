<template>
  <div ref="calendarRef"></div>
</template>

<script lang="ts">
import { Calendar, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { defineComponent, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import events from '~data/events';

export default defineComponent({
  setup() {
    const calendarRef = ref<HTMLElement>();
    const router = useRouter();

    onMounted(() => {
      const eventsArray = Object.values(events);

      const calendar = new Calendar(calendarRef.value!, {
        plugins: [dayGridPlugin, timeGridPlugin],
        initialView: 'dayGridMonth',
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek',
        },
        eventClick({ event }) {
          router.push(`/event/${event.extendedProps.slug}`);
        },
        events: eventsArray.map(
          ({ data }): EventInput => ({
            extendedProps: {
              slug: data.slug,
            },
            start: new Date(data.start),
            end: new Date(data.end),
            title: data.name,
          })
        ),
      });

      calendar.render();
    });

    return {
      calendarRef,
    };
  },
});
</script>

<style>
.fc-event {
  cursor: pointer;
}
</style>
