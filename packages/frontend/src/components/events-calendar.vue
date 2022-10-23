<template>
	<div class="column items-center">
		<div class="overflow-auto max-w-full">
			<div w:p="x-8 b-8" class="bg-yellow w-[1000px]">
				<div class="row center">
					<svg viewBox="0 0 10 10" class="arrow-svg">
						<polygon
							style="pointer-events: visibleFill"
							class="cursor-pointer"
							points="1,5 10,0 10,10"
							fill="white"
							@click="onLeftMonthArrowClick"
							@mousedown.prevent
						/>
					</svg>
					<div
						w:text="white center [3rem] md:[6rem]"
						w:font="bold"
						class="my-6 mx-14 flex-grow"
						style="text-shadow: 5px 5px rgba(230, 4, 0, 0.4)"
					>
						{{ calendarStore.currentMonth }}
					</div>
					<svg viewBox="0 0 10 10" class="arrow-svg">
						<polygon
							style="pointer-events: visibleFill"
							class="cursor-pointer"
							points="0,0 0,10 9,5"
							fill="white"
							@click="onRightMonthArrowClick"
							@mousedown.prevent
						/>
					</svg>
				</div>
				<div id="fc" ref="calendarRef" class="bg-white"></div>
				<div
					v-show="activeEvent !== undefined"
					ref="eventPopper"
					class="z-50 bg-white rounded-lg p-8 border-red border-3"
				>
					<div
						v-if="activeEvent !== undefined"
						v-click-outside="() => (activeEvent = undefined)"
						class="font-glacial"
					>
						<div class="italic text-center">{{ activeEventDateString }}</div>
						<div class="font-bold">{{ activeEvent.extendedProps.name }}</div>
						<div class="my-4">{{ activeEvent.extendedProps.description }}</div>

						<div
							class="cursor-pointer inline-flex flex-row group"
							@click="viewMoreInformation"
						>
							<span class="group-hover:text-red">More Information</span>
							<vue-icon
								:icon="mdiArrowRight"
								size="20px"
								class="ml-1 group-hover:text-red"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import type { EventApi, EventInput } from '@fullcalendar/core';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { mdiArrowRight } from '@mdi/js';
import { createPopper } from '@popperjs/core';
import dateFormat from 'dateformat';
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import { useCalendarStore } from '~/store/calendar';
import events from '~data/events';

export default defineComponent({
	setup() {
		const calendarRef = ref<HTMLElement>();
		const router = useRouter();
		const eventPopper = ref();
		const activeEvent = ref<EventApi>();
		const calendarStore = useCalendarStore();

		const activeEventDateString = computed<string>(() => {
			const event = activeEvent.value;
			if (event === undefined) return '';
			return `${dateFormat(
				event.extendedProps.start,
				'mmmm d, h:MM'
			)} - ${dateFormat(event.extendedProps.end, 'h:MM TT')}`;
		});

		let calendar: Calendar;

		function getViewMonthString(viewTitle: string) {
			return viewTitle.split(' ')[0].toLowerCase();
		}

		function getViewYearString(viewTitle: string) {
			return viewTitle.split(' ')[1];
		}

		onMounted(() => {
			const eventsArray = Object.values(events);
			const popper = createPopper(calendarRef.value!, eventPopper.value);

			calendar = new Calendar(calendarRef.value!, {
				plugins: [dayGridPlugin, timeGridPlugin],
				initialView: 'dayGridMonth',
				headerToolbar: false,
				async eventClick({ event, el }) {
					activeEvent.value = event;
					popper.state.elements.reference = el;
					await popper.update();
				},
				datesSet({ view }) {
					// Only extracting the month
					calendarStore.currentMonth = getViewMonthString(view.title);
					calendarStore.currentYear = getViewYearString(view.title);
				},
				events: eventsArray
					.filter(({ start, end }) => start !== undefined && end !== undefined)
					.map(
						({
							name,
							description,
							start,
							end,
							isSchoolWideEvent,
						}): EventInput => ({
							classNames: [isSchoolWideEvent ? 'school-event' : 'club-event'],
							extendedProps: {
								name,
								description,
								start,
								end,
							},
							start: new Date(start!),
							end: new Date(end!),
							title: name,
						})
					),
			});

			calendar.render();
			calendarStore.currentMonth = getViewMonthString(calendar.view.title);
		});

		function onLeftMonthArrowClick() {
			calendar.prev();
		}

		function onRightMonthArrowClick() {
			calendar.next();
		}

		function viewMoreInformation() {
			if (activeEvent.value !== undefined) {
				router.push(`/event/${activeEvent.value.extendedProps.slug}`);
			}
		}

		return {
			calendarStore,
			activeEvent,
			activeEventDateString,
			onLeftMonthArrowClick,
			onRightMonthArrowClick,
			viewMoreInformation,
			calendarRef,
			eventPopper,
			mdiArrowRight,
		};
	},
});
</script>

<style lang="postcss" scoped>
.arrow-svg {
	@apply w-[2rem] h-[2rem] md:w-[3rem] md:h-[3rem] hover:scale-110 transition-transform;
}
</style>

<style lang="postcss">
.fc-event {
	@apply cursor-pointer;
}

.fc-daygrid-event {
	display: grid;
	grid-template-columns: 20px auto;
	grid-template-rows: auto auto;
}

.fc-event-time {
	@apply hidden;
}

.fc-daygrid-event {
	@apply transform hover:scale-95 transition-transform;
}

.fc-daygrid-event-dot {
	@apply hidden;
}

#fc .fc-event-title {
	@apply font-glacial text-center font-medium text-md;
	white-space: normal !important;
	overflow: auto !important;
	grid-column: 1 / -1;
}

.fc .fc-toolbar-title {
	@apply text-white text-6xl font-bold;
}

.fc .fc-col-header-cell-cushion {
	@apply text-gray;
	font-size: 0.6rem;
	text-transform: uppercase;
	vertical-align: top;
}

.fc .fc-scrollgrid-sync-inner {
	@apply text-left;
}

.fc-day-today {
	@apply relative;
}

.fc-day-today::before {
	content: '';
	@apply absolute inset-0;
	border: 2px solid red;
}

#fc .school-event {
	@apply bg-red-dark;
}

#fc .club-event {
	@apply bg-yellow-deep text-white;
}

#fc .fc-day-today {
	@apply bg-white;
}

#fc .fc-daygrid-day-top {
	@apply pl-[5px] pt-[3px] flex flex-row;
}

#fc .fc-daygrid-day-number {
	@apply font-bold;
}

.fc .fc-day-other {
	background-color: rgba(0, 0, 0, 0.1);
}

.fc .fc-daygrid-day-number {
	@apply font-glacial;
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

.arrow-svg:hover {
	transform: scale(1.1);
}
</style>
