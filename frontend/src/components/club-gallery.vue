<template>
	<div id="clubs" class="max-w-6xl w-full" w:m="x-8 t-12 b-16">
		<div class="club-gallery">
			<!--
				The way we display the gallery background is using an absolutely positioned
				element that spans the entire grid. We can't apply the background on a per-grid-element
				basis because the last row might have empty club slots and thus the background on the last row
				may not extend the entire width.
			-->
			<div class="grid-background"></div>
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
		// Randomize the order the club gallery cards appear in so that more clubs get to
		// appear near the top instead of just a few select clubs.
		const clubsArray = arrayShuffle(getClubsArray(clubs));

		return {
			clubsArray,
		};
	},
});
</script>

<style scoped lang="postcss">
.grid-background {
	@apply bg-burgundy;
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
