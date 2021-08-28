<template>
	<footer class="py-8 bg-burgundy column center font-medium" w:text="white xl">
		<div class="row items-center">
			<div class="column w-56 text-right">
				<div>(416) 395-3310</div>
				<div class="break-all">schoolweb.tdsb.on.ca/victoriapark</div>
			</div>
			<div class="column items-center mx-12">
				<a
					href="https://github.com/Vic-Park/vic-park.github.io"
					target="_blank"
				>
					<img
						class="w-30 h-30 rounded-full bg-white p-3 mb-4"
						src="/img/vic-park-logo.png"
						alt="GitHub"
					/>
				</a>
			</div>
			<div class="column w-56">
				<div>15 Wallingford Rd,</div>
				<div>North York, ON</div>
				<div>M3A 2V1</div>
			</div>
		</div>
		<div class="row">
			<template v-for="{ icon, href } of links" :key="icon">
				<a :href="href">
					<vue-icon :icon="icon" size="30px" class="mx-1" />
				</a>
			</template>
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
