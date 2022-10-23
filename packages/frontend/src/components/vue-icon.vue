<template>
	<svg
		class="vue-icon"
		viewBox="0 0 24 24"
		:height="height ?? size"
		:width="width ?? size"
	>
		<path :d="icon" />
	</svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

/**
 * A generic icon component used throughout the app.
 */
export default defineComponent({
	props: {
		/** The SVG path `d` argument for the icon SVG (usually imported from @mdi/js) */
		icon: {
			type: String,
			required: true,
		},
		size: {
			type: String,
			default: undefined,
		},
		height: {
			type: String,
			default: undefined,
		},
		width: {
			type: String,
			default: undefined,
		},
	},
});
</script>

<style scoped>
.vue-icon {
	fill: currentColor;
}
</style>
