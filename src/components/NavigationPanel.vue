<template>
  <div class="calendar__nav">
    <div class="calendar__nav-months">
      <button class="calendar__nav-button" @click="decrementMonth">&lt;</button>
      <span>{{ getMonth }}</span>
      <button class="calendar__nav-button" @click="incrementMonth">&gt;</button>
    </div>
    <div class="calendar__nav-years">
      <button class="calendar__nav-button" @click="decrementYear">&lt;</button>
      <span>{{ getYear }}</span>
      <button class="calendar__nav-button" @click="incrementYear">&gt;</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import state from '@/state';
import { TimeUnits } from '@/types/enums/timeUnits';
import { MonthFormats } from '@/types/enums/timeUnits';

export default defineComponent({
  props: ['date'],
  computed: {
    getYear() {
      return this.date?.getFullYear();
    },
    getMonth() {
      return this.date?.toLocaleString('en-US', { month: MonthFormats.Short });
    },
  },
  methods: {
    changeMonth(offset: number) {
      state.state.updateCalendarDate(offset, TimeUnits.Month);
    },
    changeYear(offset: number) {
      state.state.updateCalendarDate(offset, TimeUnits.Year);
    },
    incrementMonth() {
      this.changeMonth(1);
    },
    decrementMonth() {
      this.changeMonth(-1);
    },
    decrementYear() {
      this.changeYear(-1);
    },
    incrementYear() {
      this.changeYear(1);
    },
  },
});
</script>

<style lang="scss" scoped>
.calendar__nav {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;

  .calendar__nav-months,
  .calendar__nav-years {
    display: flex;
    align-items: center;
  }

  .calendar__nav-button {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    margin: 0 10px;
    color: #c9c8d0;
  }
  .calendar__nav-button:focus {
    outline: none;
  }
}
</style>
