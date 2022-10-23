<template>
	<footer
		class="py-8 bg-red-dark column center font-medium w-full"
		w:text="white md md:xl"
	>
		<div class="row items-center w-full">
			<div class="mr-auto flex-1 column text-right">
				<div>(416) 395-3310</div>
				<a href="https://schoolweb.tdsb.on.ca/victoriapark" class="underline">
					<div class="break-all">schoolweb.tdsb.on.ca/</div>
					<div>victoriapark</div>
				</a>
			</div>
			<div w:m="x-3 md:x-12" class="column items-center">
				<a href="https://schoolweb.tdsb.on.ca/victoriapark">
					<img
						w:md="w-30 h-30 mb-4"
						class="w-15 h-15 rounded-full bg-white p-3 mb-2"
						src="/images/vic-park-logo.png"
						alt="Victoria Park Logo"
					/>
				</a>

				<div class="row">
					<template v-for="{ icon, href } of links" :key="icon">
						<a :href="href">
							<vue-icon :icon="icon" class="mx-1 w-5" w:md="w-7" />
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

import VueIcon from './vue-icon.vue';

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
		href: 'https://github.com/vic-park/vpciclubs.com',
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
