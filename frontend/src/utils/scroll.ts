export function scrollToId(elementId: string) {
	document.querySelector(`#${elementId}`)!.scrollIntoView({ behavior: 'smooth' });
}
