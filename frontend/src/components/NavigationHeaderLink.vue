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
				>
					<div w:text="lg hover:burgundy">{{ title }}</div>
				</router-link>
			</div>
		</template>
	</slot>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

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
		return { scrollToId };
	},
});
</script>
