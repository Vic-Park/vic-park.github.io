<template>
	<div
		w:m="b-8 r-8"
		class="
			fab
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
		"
		:class="{ 'fab--hidden': !isFabVisible }"
		@click="scrollToTop"
	>
		<vue-icon :icon="mdiArrowUp" size="30px"></vue-icon>
	</div>
</template>

<script lang="ts">
import { mdiArrowUp } from '@mdi/js';
import { defineComponent, onMounted, onUnmounted, ref } from 'vue';

export default defineComponent({
	name: 'BackToTopFab',
	setup() {
		const isFabVisible = ref(false);

		function updateFab() {
			if (window.scrollY > 100) {
				isFabVisible.value = true;
			} else {
				isFabVisible.value = false;
			}
		}

		onMounted(() => {
			window.addEventListener('scroll', updateFab);
		});

		onUnmounted(() => {
			window.removeEventListener('scroll', updateFab);
		});

		function scrollToTop() {
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}

		return {
			scrollToTop,
			isFabVisible,
			mdiArrowUp,
		};
	},
});
</script>

<style>
.fab--hidden {
	transform: scale(0);
}

.fab {
	transition: transform 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.fab:hover {
	transform: scale(1.1);
}
</style>
