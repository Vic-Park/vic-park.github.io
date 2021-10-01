import vue from '@vitejs/plugin-vue';
import path from 'path';
import { defineConfig } from 'vite';
import viteImagemin from 'vite-plugin-imagemin';
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
		viteImagemin({
			optipng: {
				optimizationLevel: 7,
			},
			pngquant: {
				quality: [0.2, 0.3],
				speed: 10,
			},
			mozjpeg: {
				quality: 20,
			},
		}),
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
