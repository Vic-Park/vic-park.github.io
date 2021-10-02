import ky from 'ky';

import type { Reply } from '~shared/types/auto-update';

import { replyCodeToMessage } from './reply';

export const autoUpdateKy = ky.extend({
	prefixUrl: import.meta.env.VITE_AUTO_UPDATE_SERVER_URL,
});

export async function getResponseMessage(response: Response): Promise<string> {
	try {
		const reply = (await response.json()) as Reply;
		return replyCodeToMessage(reply);
	} catch {
		return response.text();
	}
}
