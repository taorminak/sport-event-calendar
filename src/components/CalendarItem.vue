<template>
  <div class="calendar__item-container">
    <div class="calendar__item-info">
      <span :class="itemClasses" class="calendar__item-date">{{ date.getDate() }}</span>
      <button class="calendar__item-button">&plus;</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: ['date'],
  computed: {
    itemClasses() {
      return this.isCurrentDate(this.date) ? 'calendar__current-date' : '';
    },
  },
  methods: {
    isCurrentDate(checkDate: Date) {
      const currentDate = new Date();

      currentDate.setHours(0, 0, 0, 0);

      const itemDate = new Date(checkDate);

      itemDate.setHours(0, 0, 0, 0);

      return currentDate.toISOString().split('T')[0] === itemDate.toISOString().split('T')[0];
    },
  },
});
</script>

<style lang="scss">
$primaryColor: #ac9dc5;
$primaryHoverColor: #9886b6;

.calendar__item-container {
  padding: 10px;
  margin: 5px;
  border-radius: 5px;

  .calendar__item-info {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .calendar__current-date {
      background-color: red;
      color: #ffffff;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .calendar__item-date {
      font-size: 16px;
      font-weight: bold;
      width: 25px;
      height: 25px;
    }

    .calendar__item-button {
      background-color: $primaryColor;
      color: #fff;
      border: none;
      padding: 5px 10px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 14px;

      &:hover {
        background-color: $primaryHoverColor;
      }
    }
  }
}
</style>