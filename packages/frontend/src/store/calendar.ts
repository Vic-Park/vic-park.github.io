import { defineStore } from 'pinia';

type CalendarStoreState = {
	currentYear: string;
	currentMonth: string;
};

export const useCalendarStore = defineStore('calendar', {
	state: (): CalendarStoreState => ({
		currentYear: '',
		currentMonth: '',
	}),
});
