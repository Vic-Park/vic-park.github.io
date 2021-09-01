<template>
	<div class="relative">
		<div class="absolute background-tint inset-0" />
		<img src="/img/hero-image.jpg" class="object-cover hero-image w-full" />
		<div class="absolute inset-0 column center">
			<div class="z-10 hero-title text-white font-kollektif">
				victoria park ci
			</div>
			<ExploreButton class="hidden sm:block mt-5" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import ExploreButton from '~/components/explore-button.vue';

export default defineComponent({
	components: { ExploreButton },
});
</script>

<style scoped>
.background-tint {
	background-color: rgba(255, 0, 0, 0.2);
}

.hero-image {
	top: 0;
	left: 0;
}

.hero-title {
	font-size: 10vw;
	text-align: center;
}

@media screen and (min-width: 1024px) {
	.hero-title {
		font-size: 7rem;
	}
}
</style>
