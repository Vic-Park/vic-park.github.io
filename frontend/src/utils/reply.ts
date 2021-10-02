import * as AutoUpdate from '~shared/types/auto-update';

function unknownReplyCode(reply: never): string;
function unknownReplyCode(reply: AutoUpdate.Reply): string {
	return `An unknown error occurred: ${JSON.stringify(reply)}`;
}

export function replyCodeToMessage(reply: AutoUpdate.Reply) {
	switch (reply.code) {
		case AutoUpdate.ReplyCode.NO_CHANGE:
			return 'The website is up-to-date with the Google Sheet; nothing was changed.';
		case AutoUpdate.ReplyCode.SUCCESS:
			return `A website update has successfully been initiated. You can view the changes by <a href="https://github.com/Vic-Park/vic-park.github.io/commit/${reply.data.commitSha}">clicking here.</a>`;
		case AutoUpdate.ReplyCode.INCORRECT_SECRET:
			return 'An incorrect secret was provided.';
		default:
			return unknownReplyCode(reply);
	}
}
