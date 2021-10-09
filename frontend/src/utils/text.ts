import DOMPurify from 'dompurify';

export function formatText(text: string) {
	return DOMPurify.sanitize(text).replace(/\n/g, '<br/>');
}
