import xss from 'xss';

export function formatText(text: string) {
	return xss(text).replace(/\n/g, '<br/>');
}
