<template>
	<svg class="vue-icon" viewBox="0 0 24 24" :height="size" :width="size">
		<path :d="icon" />
	</svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	props: {
		icon: {
			type: String,
			required: true,
		},
		size: {
			type: String,
			default: '1em',
		},
	},
});
</script>

<style scoped>
/* Styling borrowed from Quasar's QIcon */
.vue-icon {
	line-height: 1;
	letter-spacing: normal;
	text-transform: none;
	white-space: nowrap;
	word-wrap: normal;
	direction: ltr;
	text-align: center;
	position: relative;
	box-sizing: content-box;
	fill: currentColor;
}
</style>
