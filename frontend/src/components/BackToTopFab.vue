<template>
	<div
		w:m="b-8 r-8"
		class="
			bottom-0
			right-0
			text-white
			fixed
			bg-yellow-deep
			w-10
			h-10
			rounded-full
			column
			center
			cursor-pointer
			transform
			transition-transform
			hover:scale-110
		"
		@click="scrollToTop"
	>
		<vue-icon :icon="mdiArrowUp" size="30px"></vue-icon>
	</div>
</template>

<script lang="ts">
import { mdiArrowUp } from '@mdi/js';
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'BackToTopFab',
	setup() {
		function scrollToTop() {
			document.body.scrollTop = 0;
			document.documentElement.scrollTop = 0;
		}

		return {
			scrollToTop,
			mdiArrowUp,
		};
	},
});
</script>
