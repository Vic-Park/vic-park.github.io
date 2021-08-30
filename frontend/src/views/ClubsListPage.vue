<template>
	<div class="column items-center">
		<div class="shadow-title my-8">clubs</div>
		<div class="column max-w-5xl px-8">
			<div class="relative w-60 h-10 self-end mb-8">
				<vue-icon
					class="search-icon text-gray-300 absolute"
					:icon="mdiMagnify"
					height="100%"
				/>
				<input
					v-model="searchQuery"
					w:border="2 gray-300"
					w:focus="outline-none ring-2 ring-yellow-deep border-transparent"
					class="
						pl-3
						self-center
						w-full
						h-full
						max-w-md
						p-1
						font-kollektif
						text-xl
					"
					placeholder="search club"
				/>
			</div>

			<template v-if="filteredClubs.length > 0">
				<div v-for="club in filteredClubs" :key="club.slug" class="pb-2">
					<ClubListing
						:name="club.name"
						:short-description="club.shortDescription"
						:slug="club.slug"
					/>
				</div>
			</template>
			<div v-else class="text-center">
				Unfortunately, we couldn't find a club that meets this criteria.
				However, you can always start your own club!
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { mdiMagnify } from '@mdi/js';
import { computed, defineComponent, ref } from 'vue';

import ClubListing from '~/components/ClubListing.vue';
import clubs from '~data/clubs';

export default defineComponent({
	name: 'ClubsListPage',
	components: { ClubListing },
	setup() {
		const searchQuery = ref('');
		const clubsArray = Object.entries(clubs);

		const filteredClubs = computed(() => {
			const query = searchQuery.value.toLowerCase();
			return clubsArray
				.filter(([_, { data }]) => {
					const { name, shortDescription } = data;

					return (
						name.toLowerCase().includes(query) ||
						shortDescription.toLowerCase().includes(query)
					);
				})
				.map(([slug, { data }]) => ({
					name: data.name,
					slug,
					shortDescription: data.shortDescription,
				}));
		});

		type ClubSummary = {
			name: string;
			slug: string;
			shortDescription: string;
		};

		const categories: Record<string, ClubSummary[]> = {};
		for (const [slug, club] of clubsArray) {
			const clubCategories = club.data.categories.split(',');
			for (const unnormalizedCategory of clubCategories) {
				const category = unnormalizedCategory.trim();
				categories[category] = categories[category] ?? [];
				categories[category].push({
					name: club.data.name,
					slug,
					shortDescription: club.data.shortDescription,
				});
			}
		}

		return {
			categories,
			searchQuery,
			filteredClubs,
			mdiMagnify,
		};
	},
});
</script>

<style scoped>
.search-icon {
	right: 0;
	pointer-events: none;
}
</style>
