<template>
	<template v-if="found">
		<div class="p-8 column items-center">
			<div class="max-w-4xl w-full">
				<h1 w:text="center 5xl" class="font-bold mb-2">{{ name }}</h1>
				<div w:text="center xl" class="pb-4">
					{{ startDateString }} - {{ endDateString }}
				</div>

				<h2 class="font-bold text-2xl">Description</h2>
				<div class="pt-1 text-md">{{ description }}</div>

				<h2 class="font-bold text-2xl pt-4">Information</h2>
				<div class="pt-1 text-md">{{ content }}</div>
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

		const {
			data: { name, description, information, start, end, slug },
			content,
		} = events[eventSlug];
		const startDateString = formatFullDateTime(start);
		const endDateString = formatFullDateTime(end);

		return {
			found: true,

			name,
			description,
			startDateString,
			endDateString,
			information,
			content,
			slug,
		};
	},
});
</script>
