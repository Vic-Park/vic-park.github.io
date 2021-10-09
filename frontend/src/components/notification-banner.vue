<template>
	<template v-if="flag !== 'hidden'">
		<div class="row bg-blue-400 items-center py-2 px-4 justify-between">
			<div class="mr-auto flex-1"></div>
			<div
				class="notification text-center text-white flex-grow px-4"
				v-html="html"
			></div>
			<vue-icon
				:icon="mdiClose"
				class="ml-auto text-white cursor-pointer min-w-[24px]"
				size="24px"
				@click="closeNotification"
			/>
		</div>
	</template>
</template>

<script lang="ts">
import { mdiClose } from '@mdi/js';
import { defineComponent } from 'vue';

import { useLocalStorageRef } from '~/utils/reactivity';

export default defineComponent({
	props: {
		/**
		 * A flag that gets set when the user closes the notification so it doesn't display again
		 */
		localStorageFlag: {
			type: String,
			required: true,
		},
		html: {
			type: String,
			required: true,
		},
	},
	setup(props) {
		const flag = useLocalStorageRef(props.localStorageFlag);

		function closeNotification() {
			flag.value = 'hidden';
		}

		return {
			mdiClose,
			flag,
			closeNotification,
		};
	},
});
</script>

<style scoped lang="postcss">
.notification :deep(a) {
	@apply text-burgundy underline;
}
</style>
