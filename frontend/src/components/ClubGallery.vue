<template>
	<div id="clubs" class="max-w-6xl w-full mx-8 mt-12 mb-16">
		<div class="relative club-gallery">
			<div class="grid-background bg-burgundy"></div>
			<div v-for="club in clubsArray" :key="club.slug" class="m-[1rem]">
				<ClubGalleryCard
					:name="club.name"
					:description="club.description"
					:slug="club.slug"
					:equity-statement="club.equityStatement"
				/>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import ClubGalleryCard from '~/components/ClubGalleryCard.vue';
import clubs from '~data/clubs';

export default defineComponent({
	components: { ClubGalleryCard },
	setup() {
		const clubsArray = Object.entries(clubs).map(([_name, { data }]) => ({
			slug: data.slug,
			name: data.name,
			description: data.shortDescription,
			equityStatement: data.equityStatement,
		}));

		return {
			clubsArray,
		};
	},
	methods: {
		scrollRight(event: any) {
			event.target.parentElement.childNodes[1].scrollLeft += 1000;
		},
		scrollLeft(event: any) {
			event.target.parentElement.childNodes[1].scrollLeft -= 1000;
		},
	},
});
</script>

<style scoped>
.grid-background {
	position: absolute;
	grid-column: 1 / -1;
	width: calc(100% + 2rem);
	height: calc(100% + 2rem);
	margin-top: -1rem;
	margin-left: -1rem;
}

.club-gallery {
	padding-left: 1rem;
	padding-right: 1rem;
	display: grid;
	position: relative;
	justify-content: center;
	grid-template-columns: repeat(auto-fit, minmax(22rem, max-content));
}
</style>
