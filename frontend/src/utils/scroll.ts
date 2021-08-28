export function scrollToId(elementId: string) {
	document.getElementById(elementId)!.scrollIntoView({ behavior: 'smooth' });
}
