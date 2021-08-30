<template>
	<slot name="link">
		<template v-if="toId">
			<div
				class="cursor-pointer"
				w:text="white lg hover:gray-300"
				@click="scrollToId(toId)"
			>
				{{ title }}
			</div>
		</template>
		<template v-else>
			<div class="text-white">
				<router-link
					:to="route"
					:exact-active-class="noActiveClass ? '' : 'text-burgundy'"
					class="text-lg"
					:class="
						navigationLinkClass !== undefined
							? navigationLinkClass
							: 'hover:burgundy'
					"
				>
					{{ title }}
				</router-link>
			</div>
		</template>
	</slot>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRoute } from 'vue-router';

import { scrollToId } from '~/utils/scroll';

export default defineComponent({
	inheritAttrs: false,
	props: {
		title: {
			type: String,
			required: true,
		},
		toId: {
			type: String,
			default: '',
		},
		route: {
			type: String,
			default: '',
		},
		noActiveClass: {
			type: Boolean,
			default: false,
		},
	},
	setup() {
		const route = useRoute();

		const navigationLinkClass = computed(() => route.meta.navigationLinkClass);

		return { scrollToId, navigationLinkClass };
	},
});
</script>
