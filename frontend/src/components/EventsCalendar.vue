<template>
  <div class="flex-col flex items-center">
    <div class="max-w-full overflow-auto bg-yellow px-8 pb-8">
      <div class="flex flex-row justify-center items-center">
        <svg
          viewBox="0 0 10 10"
          height="50"
          width="50"
          class="hover:scale-110 transition-transform"
        >
          <polygon
            style="pointer-events: visibleFill"
            class="cursor-pointer"
            @click="onLeftMonthArrowClick"
            points="1,5 10,0 10,10"
            fill="white"
          />
        </svg>
        <div
          style="text-shadow: 5px 5px rgba(230, 4, 0, 0.4)"
          class="text-white text-center font-extrabold text-[6rem] mx-14"
        >
          {{ activeMonth }}
        </div>
        <svg
          viewBox="0 0 10 10"
          height="50"
          width="50"
          class="hover:scale-110 transition-transform"
        >
          <polygon
            style="pointer-events: visibleFill"
            class="cursor-pointer"
            @click="onRightMonthArrowClick"
            points="0,0 0,10 9,5"
            fill="white"
          />
        </svg>
      </div>
      <div ref="calendarRef" style="width: 900px" class="bg-white"></div>
    </div>
  </div>
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
    const activeMonth = ref();
    let calendar: Calendar;

    function getViewDateString(viewTitle: string) {
      return viewTitle.split(' ')[0].toLowerCase();
    }

    onMounted(() => {
      const eventsArray = Object.values(events);

      calendar = new Calendar(calendarRef.value!, {
        plugins: [dayGridPlugin, timeGridPlugin],
        initialView: 'dayGridMonth',
        headerToolbar: false,
        eventClick({ event }) {
          router.push(`/event/${event.extendedProps.slug}`);
        },
        datesSet({ view }) {
          // Only extracting the month
          activeMonth.value = getViewDateString(view.title);
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
      activeMonth.value = getViewDateString(calendar.view.title);
    });

    function onLeftMonthArrowClick() {
      calendar.prev();
    }

    function onRightMonthArrowClick() {
      calendar.next();
    }

    return {
      activeMonth,
      onLeftMonthArrowClick,
      onRightMonthArrowClick,
      calendarRef,
    };
  },
});
</script>

<style lang="postcss">
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

.fc .fc-toolbar-title {
  @apply text-white text-6xl font-bold;
}

.fc .fc-col-header-cell-cushion {
}
</style>

<style scoped lang="scss">
@use 'sass:math';

$triangle-width: 3rem;
$triangle-ratio: 1.8;

.triangle-left {
  width: 0;
  height: 0;
  border-top: math.div($triangle-width, $triangle-ratio) solid transparent;
  border-right: $triangle-width solid white;
  border-bottom: math.div($triangle-width, $triangle-ratio) solid transparent;
}

.triangle-right {
  width: 0;
  height: 0;
  border-top: math.div($triangle-width, $triangle-ratio) solid transparent;
  border-left: $triangle-width solid white;
  border-bottom: math.div($triangle-width, $triangle-ratio) solid transparent;
}
</style>
