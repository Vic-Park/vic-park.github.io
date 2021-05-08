<template>
  <div class="flex flex-col">
    <h1 class="text-4xl font-bold self-center pb-4">Search Clubs</h1>

    <input
      v-model="searchQuery"
      class="
				self-center
				w-full
				max-w-md
				border-2 
				border-gray-300 
				rounded-lg 
				p-1 
				mb-4
				focus:outline-none 
				focus:ring-2 
				focus:ring-yellow-600 
				focus:border-transparent"
      placeholder="Search for a club..."
    />

    <template v-if="filteredClubs.length > 0">
      <div class="pb-2" v-for="club in filteredClubs" :key="club.slug">
        <ClubListing
          :name="club.name"
          :shortDescription="club.shortDescription"
          :slug="club.slug"
        />
      </div>
    </template>
    <div v-else class="text-center">
      Unfortunately, we couldn't find a club that meets this criteria. However, you can always start
      your own club!
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import ClubListing from '~/components/ClubListing.vue';
import clubs from '~data/clubs';

export default defineComponent({
  name: 'HomePage',
  components: { ClubListing },
  setup() {
    const searchQuery = ref('');
    const clubsArray = Object.values(clubs);

    const filteredClubs = computed(() =>
      clubsArray
        .filter(({ data }) => {
          const { name, shortDescription } = data;

          return name.includes(searchQuery.value) || shortDescription.includes(searchQuery.value);
        })
        .map(({ data }) => ({
          name: data.name,
          slug: data.slug,
          shortDescription: data.shortDescription,
        }))
    );

    return {
      searchQuery,
      filteredClubs,
    };
  },
});
</script>
