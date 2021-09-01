<template>
	<div class="shadow-title mt-8">calendar</div>
	<div
		w:font="bold glacial"
		w:text="lg burgundy center"
		class="mb-4 tracking-widest"
	>
		{{ calendarStore.currentYear }}
	</div>
	<EventsCalendar />
	<div w:p="x-16 t-6 b-16">
		<h1 w:text="4xl center" class="font-bold py-8">Upcoming Club Events</h1>
		<EventListing
			v-for="event in eventsArray"
			:key="event.slug"
			:description="event.description"
			:name="event.name"
			:start="event.start.toString()"
			:end="event.end.toString()"
			:slug="event.slug"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import EventListing from '~/components/event-listing.vue';
import EventsCalendar from '~/components/events-calendar.vue';
import { useCalendarStore } from '~/store/calendar';
import events from '~data/events';

export default defineComponent({
	components: { EventsCalendar, EventListing },
	setup() {
		const eventsArray = Object.entries(events).map(([slug, { data }]) => ({
			name: data.name,
			start: data.start,
			end: data.end,
			description: data.description,
			slug,
		}));

		const calendarStore = useCalendarStore();

		return {
			eventsArray,
			calendarStore,
		};
	},
});
</script>
