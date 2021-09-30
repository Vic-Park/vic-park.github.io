<template>
	<template v-if="found">
		<div class="p-8 column items-center">
			<div class="max-w-4xl w-full">
				<h1 w:text="center 5xl" class="font-bold mb-2">{{ name }}</h1>
				<div w:text="center xl" class="pb-4">
					{{ entireDateString }}
				</div>

				<h2 class="font-bold text-2xl">Description</h2>
				<div class="pt-1 text-md">{{ description }}</div>

				<h2 class="font-bold text-2xl pt-4">Information</h2>
				<div class="pt-1 text-md">{{ information }}</div>
			</div>
		</div>
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

		const { name, description, start, end, information } = events[eventSlug];
		const startDateString =
			start === undefined ? 'TBA' : formatFullDateTime(start);
		const endDateString = end === undefined ? 'TBA' : formatFullDateTime(end);
		const entireDateString =
			startDateString === endDateString
				? startDateString
				: `${startDateString} - ${endDateString}`;

		return {
			found: true,

			name,
			description,
			entireDateString,
			information,
		};
	},
});
</script>
