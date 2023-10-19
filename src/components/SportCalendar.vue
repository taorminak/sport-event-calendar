<template>
  <div class="calendar">
    <NavigationPanel :date="date" />
    <div class="calendar__container-days">
      <div v-for="weekDay in daysOfWeek" :key="weekDay" class="container__item-day item-weekday">
        {{ weekDay }}
      </div>

      <div v-for="(day, index) in daysInMonth" :key="index" class="container__item-day">
        {{ day }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavigationPanel from './NavigationPanel.vue';

const DAYS_IN_WEEK = 7;

function getFirstWeekday(month: number, year: number): number {
  const firstDayOfMonth = new Date(year, month, 1);
  const firstWeekDay = firstDayOfMonth.getDay() === 0 ? 6 : firstDayOfMonth.getDay() - 1;

  return firstWeekDay;
}

function calculateDaysInMonth(month: number, year: number): (string | number)[] {
  const daysOfMonth = [];
  const lastDayOfMonth = new Date(year, month + 1, 0).getDate();

  const firstWeekDay = getFirstWeekday(month, year);

  for (let day = 1; day <= lastDayOfMonth; day++) {
    daysOfMonth.push(day);
  }

  for (let i = 0; i < firstWeekDay; i++) {
    daysOfMonth.unshift('');
  }

  return daysOfMonth;
}

export default defineComponent({
  components: {
    NavigationPanel,
  },
  props: ['date'],
  computed: {
    daysInMonth() {
      const currentDay = this.date;
      const month = currentDay?.getMonth() || 0;
      const year = currentDay?.getFullYear() || 0;

      return calculateDaysInMonth(month, year);
    },
    daysOfWeek() {
      const daysOfWeek = [];
      const startDate = new Date('2023-10-16');

      for (let i = 0; i < DAYS_IN_WEEK; i++) {
        daysOfWeek.push(startDate.toLocaleDateString('en-EN', { weekday: 'short' }));
        startDate.setDate(startDate.getDate() + 1);
      }

      return daysOfWeek;
    },
  },
});
</script>

<style lang="scss">
.calendar {
  width: 80vw;
  margin: auto;
  margin-top: 20px;
  border: 1px solid #c9c8d0;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.calendar__container-days {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  min-height: 80vh;
  border-top: 1px solid #c9c8d0;

  .container__item-day {
    width: calc(100% / 7);
    border: 1px solid #c9c8d0;
    padding: 10px;
    text-align: center;
    background-color: #a5a4ab;
    color: #3b3a3d;
  }
}
</style>
