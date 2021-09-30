<template>
	<router-link
		:to="`/event/${name}`"
		w:text="2xl hover:blue-400"
		class="font-bold"
	>
		{{ name }}
	</router-link>
	<div class="text-md">{{ entireDateString }}</div>
	<div class="text-md pt-2">{{ description }}</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

import { formatFullDateTime } from '~/utils/date';

export default defineComponent({
	name: 'EventListing',
	props: {
		name: {
			type: String,
			required: true,
		},
		start: {
			type: String,
			default: 'TBA',
		},
		end: {
			type: String,
			default: 'TBA',
		},
		description: {
			type: String,
			required: true,
		},
	},
	setup(props) {
		const startDateString = computed(() => formatFullDateTime(props.start));
		const endDateString = computed(() => formatFullDateTime(props.end));
		const entireDateString = computed(() =>
			startDateString.value === endDateString.value
				? startDateString.value
				: `${startDateString.value} - ${endDateString.value}`
		);

		return {
			startDateString,
			endDateString,
			entireDateString,
		};
	},
});
</script>
