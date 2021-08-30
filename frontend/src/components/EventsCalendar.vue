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
						/>
					</svg>
					<div
						w:text="white center [3rem] md:[6rem]"
						w:font="bold"
						class="my-6 mx-14"
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
						/>
					</svg>
				</div>
				<div id="fc" ref="calendarRef" class="bg-white"></div>
				<div
					v-show="activeEvent !== undefined"
					ref="eventPopper"
					class="z-50 bg-white rounded-lg p-8 border-2"
				>
					<div
						v-if="activeEvent !== undefined"
						v-click-outside="() => (activeEvent = undefined)"
					>
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
import { defineComponent, onMounted, ref } from 'vue';
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

		let calendar: Calendar;

		function getViewMonthString(viewTitle: string) {
			return viewTitle.split(' ')[0].toLowerCase();
		}

		function getViewYearString(viewTitle: string) {
			return viewTitle.split(' ')[1];
		}

		onMounted(() => {
			const eventsArray = Object.entries(events);
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
				events: eventsArray.map(
					([slug, { data }]): EventInput => ({
						extendedProps: {
							name: data.name,
							description: data.description,
							slug,
						},
						start: new Date(data.start),
						end: new Date(data.end),
						title: data.name,
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
	font-size: 0.6rem;
	text-transform: uppercase;
	vertical-align: top;
	color: gray;
}

.fc .fc-scrollgrid-sync-inner {
	text-align: left;
}

.fc-day-today {
	position: relative;
}

.fc-day-today::before {
	content: '';
	position: absolute;
	border: 2px solid red;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
}

#fc .fc-day-today {
	background-color: white;
}

#fc .fc-daygrid-day-top {
	padding-left: 5px;
	padding-top: 3px;
	display: flex;
	flex-direction: row;
}

#fc .fc-daygrid-day-number {
	font-weight: bold;
}

.fc .fc-day-other {
	background-color: rgba(0, 0, 0, 0.1);
}

.fc .fc-daygrid-day-number {
	font-family: 'Glacial Indifference';
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
