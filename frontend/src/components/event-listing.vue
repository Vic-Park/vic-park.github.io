<template>
	<router-link
		:to="`/event/${name}`"
		w:text="2xl hover:blue-400"
		class="font-bold"
	>
		{{ name }}
	</router-link>
	<div class="text-md">{{ startDateString }} - {{ endDateString }}</div>
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
			required: true,
		},
		end: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
	},
	setup(props) {
		const startDateString = computed(() => formatFullDateTime(props.start));
		const endDateString = computed(() => formatFullDateTime(props.end));

		return {
			startDateString,
			endDateString,
		};
	},
});
</script>
