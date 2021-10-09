<template>
	<h1 class="text-2xl font-bold pb-1">{{ title }}</h1>
	<div class="text-sm pb-2">{{ dateString }}</div>
	<div class="announcement-content" v-html="htmlContent"></div>
</template>

<script lang="ts">
import Autolinker from 'autolinker';
import DOMPurify from 'dompurify';
import { computed, defineComponent } from 'vue';

import { formatFullDateTime } from '~/utils/date';
import { formatText } from '~/utils/text';

/**
 * A listing for a club announcement.
 */
export default defineComponent({
	name: 'ClubAnnouncementListing',
	props: {
		title: {
			type: String,
			required: true,
		},
		date: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
	},
	setup(props) {
		const dateString = computed(() => formatFullDateTime(props.date));
		const htmlContent = computed(() =>
			DOMPurify.sanitize(
				Autolinker.link(formatText(props.content ?? ''), {
					mention: 'instagram',
				})
			)
		);

		return {
			dateString,
			htmlContent,
		};
	},
});
</script>

<style scoped lang="postcss">
.announcement-content :deep(a) {
	@apply underline text-blue-600 hover:text-blue-800;
}
</style>
