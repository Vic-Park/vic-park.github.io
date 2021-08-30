<template>
	<footer
		class="py-8 bg-burgundy column center font-medium w-full"
		w:text="white xs sm:xl"
	>
		<div class="row items-center w-full">
			<div class="mr-auto flex-1 column text-right">
				<div>(416) 395-3310</div>
				<a
					href="https://schoolweb.tdsb.on.ca/victoriapark"
					class="underline"
				>
					<div class="break-all">schoolweb.tdsb.on.ca/</div>
					<div>victoriapark</div>
				</a>
			</div>
			<div class="column items-center mx-3 sm:mx-12">
				<a href="https://schoolweb.tdsb.on.ca/victoriapark">
					<img
						w:sm="w-30 h-30"
						class="w-15 h-15 rounded-full bg-white p-3 mb-4"
						src="/img/vic-park-logo.png"
						alt="Victoria Park Logo"
					/>
				</a>

				<div class="row">
					<template v-for="{ icon, href } of links" :key="icon">
						<a :href="href">
							<vue-icon :icon="icon" class="mx-1 w-5 sm:w-7" />
						</a>
					</template>
				</div>
			</div>
			<div class="flex-1 ml-auto column">
				<div>15 Wallingford Rd,</div>
				<div>North York, ON</div>
				<div>M3A 2V1</div>
			</div>
		</div>
	</footer>
</template>

<script lang="ts">
import { mdiEmail, mdiGithub, mdiInstagram, mdiTwitter } from '@mdi/js';
import { defineComponent } from 'vue';

import VueIcon from './VueIcon.vue';

type Link = {
	icon: string;
	href: string;
};

const links: Link[] = [
	{
		icon: mdiInstagram,
		href: 'https://instagram.com/victoriaparkci',
	},
	{
		icon: mdiTwitter,
		href: 'https://twitter.com/vicparkci',
	},
	{
		icon: mdiEmail,
		href: 'mailto:VictoriaParkCI@tdsb.on.ca',
	},
	{
		icon: mdiGithub,
		href: 'https://github.com/vic-park/vic-park.github.io',
	},
];

export default defineComponent({
	name: 'WebsiteFooter',
	components: { VueIcon },
	setup() {
		return { links };
	},
});
</script>
