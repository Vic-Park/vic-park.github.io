import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import path from 'path';

import announcementsLoader from './plugins/announcements-loader';
import clubsLoader from './plugins/clubs-loader';
import eventsLoader from './plugins/events-loader';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), announcementsLoader(), clubsLoader(), eventsLoader()],
  optimizeDeps: {
    exclude: ['@fullcalendar/core', '@fullcalendar/daygrid', '@fullcalendar/timegrid'],
  },
  resolve: {
    alias: [{ find: '~', replacement: path.resolve(__dirname, './src') }],
  },
});
