import vue from '@vitejs/plugin-vue';
import path from 'path';
import { defineConfig } from 'vite';
import WindiCSS from 'vite-plugin-windicss';

import announcementsLoader from './plugins/announcements-loader';
import clubsLoader from './plugins/clubs-loader';
import eventsLoader from './plugins/events-loader';

// https://vitejs.dev/config/
// eslint-disable-next-line import/no-default-export
export default defineConfig({
	plugins: [
		vue(),
		WindiCSS(),
		announcementsLoader(),
		clubsLoader(),
		eventsLoader(),
	],
	optimizeDeps: {
		exclude: [
			'@fullcalendar/core',
			'@fullcalendar/daygrid',
			'@fullcalendar/timegrid',
		],
	},
	resolve: {
		alias: [{ find: '~', replacement: path.resolve(__dirname, './src') }],
	},
});
