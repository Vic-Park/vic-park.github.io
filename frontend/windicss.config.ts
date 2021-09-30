import { defineConfig } from 'windicss/helpers';
import lineClampPlugin from 'windicss/plugin/line-clamp';

// eslint-disable-next-line import/no-default-export
export default defineConfig({
	attributify: {
		prefix: 'w:',
	},
	shortcuts: {
		column: 'flex flex-col',
		row: 'flex flex-row',
		center: 'justify-center items-center',
	},
	theme: {
		extend: {
			colors: {
				burgundy: '#960e0b',
				red: {
					DEFAULT: '#e60400',
					dark: '#bb0e0a',
				},
				yellow: {
					DEFAULT: '#ffd621',
					deep: '#fcc534',
				},
			},
			transitionProperty: {
				height: 'height',
			},
			minWidth: {
				80: '20rem',
			},
			maxWidth: {
				80: '20rem',
				'3card': '66rem',
				'2card': '44.5rem',
			},
			width: {
				'3card': '66rem',
				'2card': '44.5rem',
			},
			screens: {
				'2card': '840px',
				'3card': '1184px',
			},

			fontFamily: {
				kollektif: ['Kollektif'],
				glacial: ['Glacial Indifference'],
			},
		},
	},
	plugins: [lineClampPlugin],
});
