<template>
  <div ref="calendarRef"></div>
</template>

<script lang="ts">
import { Calendar, EventInput } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
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

.fc-daygrid-event {
  display: grid;
  grid-template-columns: 20px auto;
  grid-template-rows: auto auto;
}

.fc-daygrid-event-dot {
  grid-column: 1 / span 1;
  grid-row: 1 / -1;
}

.fc-event-title {
  white-space: normal !important;
  overflow: auto !important;
}
</style>
