<template>
	<NavigationHeaderLink class="mx-2 mr-auto" route="/" title="home" />
	<div w:md="flex" class="hidden flex-1 flex-row gap-x-4 justify-end">
		<div v-for="tab in tabs" :key="tab.title" class="mx-2">
			<NavigationHeaderLink
				:route="tab.route"
				:toId="tab.toId"
				:title="tab.title"
				:class="tab.class"
			/>
		</div>
	</div>
	<div class="md:hidden">
		<vue-icon
			:icon="mdiMenu"
			class="text-white h-full mr-2 cursor-pointer"
			size="20px"
			@click="onMenuClick"
		/>
		<div v-if="isMenuOpen" class="relative z-50" v-click-outside="() => (isMenuOpen = false)">
			<div class="column absolute right-0 border rounded-sm overflow-hidden bg-white p-1">
				<div v-for="tab in tabs" :key="tab.title" class="px-2 py-1">
					<NavigationHeaderLink
						:key="tab.title"
						:route="tab.route"
						:toId="tab.toId"
						:title="tab.title"
						:class="tab.class"
					>
						<template #link>
							<div @click="isMenuOpen = false">
								<template v-if="tab.toId">
									<div
										@click="tab.toId && scrollToId(tab.toId)"
										w:text="black lg hover:red"
										class="cursor-pointer"
									>
										{{ tab.title }}
									</div>
								</template>
								<template v-else>
									<router-link :to="tab.route" active-class="text-red">
										<div w:text="lg hover:red">{{ tab.title }}</div>
									</router-link>
								</template>
							</div>
						</template>
					</NavigationHeaderLink>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { Tab } from '~/types/tab';
import { mdiMenu } from '@mdi/js';
import { scrollToId } from '~/utils/scroll';

import NavigationHeaderLink from './NavigationHeaderLink.vue';
import VueIcon from './VueIcon.vue';

export default defineComponent({
	name: 'NavigationHeader',
	props: {
		tabs: {
			type: Array as PropType<Tab[]>,
			required: true,
		},
	},
	components: { NavigationHeaderLink, VueIcon },
	setup() {
		const isMenuOpen = ref(false);

		function onMenuClick() {
			isMenuOpen.value = !isMenuOpen.value;
		}

		return {
			mdiMenu,
			isMenuOpen,
			onMenuClick,
			scrollToId,
		};
	},
});
</script>
