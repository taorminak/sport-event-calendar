import { reactive } from 'vue';
import { TimeUnits } from './types/enums/timeUnits';

// Local State: Used for tracking and changing the calendar date
const state = reactive({
  calendarDate: new Date(),
  selectedDate: '',
  updateCalendarDate(offset: number, unit: TimeUnits) {
    const date = new Date(state.calendarDate);

    unit === TimeUnits.Month ? date.setMonth(date.getMonth() + offset) : date.setFullYear(date.getFullYear() + offset);

    state.calendarDate = date;
  },
});

export default {
  state,
};
