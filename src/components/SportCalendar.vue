<template>
  <div class="calendar">
    <div class="calendar__container-days">
      <div v-for="day in daysInMonth" :key="day" class="container__item-day">
        {{ day }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      currentMonth: new Date().getMonth() + 1,
    };
  },
  computed: {
    daysInMonth() {
      const days = [];
      const year = new Date().getFullYear();
      const month = this.currentMonth;

      for (let day = 1; day <= 31; day++) {
        if (new Date(year, month - 1, day).getMonth() + 1 === month) {
          days.push(day);
        }
      }

      return days;
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
  }
}
</style>
