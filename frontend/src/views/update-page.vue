<template>
	<div class="column center h-full max-w-4xl mx-auto">
		<p class="text-center px-4">
			To update the website from the values in the Google Sheets, please enter
			the secret in the following textbox and press the "Update" button.
		</p>
		<div class="mt-2 column items-center">
			<div class="row">
				<input
					v-model="secret"
					class="border-2 rounded-md p-2"
					placeholder="Enter the secret here..."
				/>
				<button
					:disabled="isLoading"
					:class="[
						isLoading
							? 'bg-gray-500 cursor-wait'
							: 'bg-red-dark hover:bg-burgundy',
					]"
					class="p-2 ml-2 rounded-md font-bold text-white"
					@click="updateWebsite"
				>
					{{ isLoading ? 'Updating...' : 'Update' }}
				</button>
			</div>
			<div class="mt-2 text-center">
				<div v-if="errorMessage !== undefined" class="text-red-600">
					{{ errorMessage }}
				</div>
				<div
					v-if="replyMessage !== undefined"
					class="reply-message text-green-500"
					v-html="replyMessage"
				></div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import { autoUpdateKy, getResponseMessage } from '~/utils/ky';

export default defineComponent({
	setup() {
		const secret = ref('');
		const errorMessage = ref();
		const replyMessage = ref();
		const isLoading = ref(false);

		async function updateWebsite() {
			isLoading.value = true;
			try {
				errorMessage.value = undefined;
				replyMessage.value = undefined;
				const response = await autoUpdateKy.post('update', {
					json: {
						secret: secret.value,
					},
					timeout: false,
					throwHttpErrors: false,
				});
				const message = await getResponseMessage(response);
				if (response.ok) {
					replyMessage.value = message;
				} else {
					errorMessage.value = message;
				}
			} finally {
				isLoading.value = false;
			}
		}

		return {
			updateWebsite,
			isLoading,
			secret,
			errorMessage,
			replyMessage,
		};
	},
});
</script>

<style lang="postcss">
.reply-message a {
	@apply text-blue-500 underline-current;
}
</style>
