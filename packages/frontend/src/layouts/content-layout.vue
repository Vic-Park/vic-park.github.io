<template>
	<div class="column w-full h-full">
		<NavigationHeader
			v-if="route.meta.hideNavigationHeader !== true"
			:header-class="route.meta.navigationHeaderClass"
		/>
		<div class="flex-grow">
			<router-view />
		</div>
		<WebsiteFooter />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';

import NavigationHeader from '~/components/navigation-header.vue';
import WebsiteFooter from '~/components/website-footer.vue';

export default defineComponent({
	components: { NavigationHeader, WebsiteFooter },
	setup() {
		const route = useRoute();

		return { route };
	},
});
</script>
