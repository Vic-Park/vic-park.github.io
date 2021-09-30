<template>
	<div id="clubs" class="max-w-6xl w-full mx-8 mt-12 mb-16">
		<div class="relative club-gallery">
			<div class="grid-background bg-burgundy"></div>
			<div v-for="club in clubsArray" :key="club.slug" class="m-[1rem]">
				<ClubGalleryCard
					:name="club.name"
					:description="club.shortDescription"
					:slug="club.slug"
					:equity-statement="club.equityStatement"
				/>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import arrayShuffle from 'array-shuffle';
import { defineComponent } from 'vue';

import ClubGalleryCard from '~/components/club-gallery-card.vue';
import { getClubsArray } from '~/utils/club';
import clubs from '~data/clubs';

export default defineComponent({
	components: { ClubGalleryCard },
	setup() {
		const clubsArray = arrayShuffle(getClubsArray(clubs)).map(
			({ slug, name, shortDescription, equityStatement }) => ({
				slug,
				name,
				shortDescription,
				equityStatement,
			})
		);

		return {
			clubsArray,
		};
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
