<template>
  <div ref="calendarRef"></div>
</template>

<script lang="ts">
import { Calendar, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { defineComponent, onMounted, ref } from 'vue';

import events from '~data/events';

export default defineComponent({
  setup() {
    const calendarRef = ref<HTMLElement>();

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
        events: eventsArray.map(
          ({ data }): EventInput => ({
            id: data.slug,
            date: new Date(data.start),
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
