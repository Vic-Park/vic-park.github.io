<template>
	<h1 class="text-2xl font-bold pb-1">{{ title }}</h1>
	<div class="text-sm pb-2">{{ dateString }}</div>
	<div>
		{{ content }}
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

import { formatFullDateTime } from '~/utils/date';

export default defineComponent({
	name: 'ClubAnnouncementListing',
	props: {
		title: {
			type: String,
			required: true,
		},
		date: {
			type: String,
			default: undefined,
		},
		content: {
			type: String,
			required: true,
		},
	},
	setup(props) {
		const dateString = computed(() => formatFullDateTime(props.date!));
		return {
			dateString,
		};
	},
});
</script>
