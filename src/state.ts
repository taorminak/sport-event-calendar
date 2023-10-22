import { reactive } from 'vue';

const state = reactive({
  calendarDate: new Date(),
  selectedDate: '',
  updateCalendarDate(offset: number, unit: 'month' | 'year') {
    const date = new Date(state.calendarDate);

    unit === 'month' ? date.setMonth(date.getMonth() + offset) : date.setFullYear(date.getFullYear() + offset);

    state.calendarDate = date;
  },
});

export default {
  state,
};
