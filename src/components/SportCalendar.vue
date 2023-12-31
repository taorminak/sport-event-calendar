<template>
  <div class="calendar">
    <NavigationPanel :date="date" />
    <div class="calendar__container-days">
      <div
        v-for="(weekDay, index) in daysOfWeek"
        :key="weekDay"
        :class="getDayClass(index, 'daysOfWeek')"
        class="container__item-day item-weekday"
      >
        {{ weekDay }}
      </div>

      <div
        v-for="(day, index) in daysInMonth"
        :key="index"
        :class="getDayClass(index, 'daysInMonth')"
        class="container__item-day"
      >
        <Calendar-item :date="day" v-if="day" :navigateTo="navigateTo" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavigationPanel from './NavigationPanel.vue';
import CalendarItem from './CalendarItem.vue';
import { calculateDaysInMonth, getDaysOfWeek } from '@/helpers/date-helpers/dateHelpers';
import { DAYS_IN_WEEK } from '@/constants';

export default defineComponent({
  created() {
    this.daysOfWeek = getDaysOfWeek();
  },
  data() {
    return {
      daysOfWeek: [] as string[],
    };
  },
  components: {
    NavigationPanel,
    CalendarItem,
  },
  props: ['date', 'navigateTo'],
  computed: {
    isLightTheme() {
      return this.$store.state.theme.isLightTheme;
    },
    daysInMonth() {
      const currentDay = this.date;
      const month = currentDay?.getMonth() || 0;
      const year = currentDay?.getFullYear() || 0;

      return calculateDaysInMonth(month, year);
    },
  },
  methods: {
    getDayClass(index: number, part: string): string {
      const isWeekend = index % DAYS_IN_WEEK === 5 || index % DAYS_IN_WEEK === 6;

      const themeClass = this.isLightTheme ? 'light' : 'dark';

      if (isWeekend) {
        return part === 'daysInMonth' ? `item-weekend ${themeClass}` : `item-weekend-weekday ${themeClass}`;
      }

      return themeClass;
    },
  },
});
</script>

<style lang="scss" scoped>
.calendar {
  width: 80vw;
  margin: auto;
  margin-top: 20px;
  border: 1px solid #ac9dc5;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.calendar__container-days {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  min-height: 80vh;

  .container__item-day {
    width: calc(100% / 7);
    padding: 3px;
    text-align: center;
    background-color: #f0efef;
    color: #3b3a3d;

    &.light {
      background-color: #f0efef;
      color: #3b3a3d;
    }

    &.dark {
      background-color: #aba6bc;
      color: #3b3a3d;
    }
  }

  .item-weekday {
    &.light {
      background-color: #ffffff;
      color: #3b3a3d;
    }

    &.dark {
      background-color: #27263d;
      color: #ac9dc5;
    }
  }

  .item-weekend-weekday {
    color: #a5a4ab;
  }

  .item-weekend {
    &.light {
      background-color: #e8e7e7;
      color: #3b3a3d;
    }

    &.dark {
      background-color: #a39db9;
      color: #3b3a3d;
    }
  }
}

@media (max-width: 1023px) {
  .calendar {
    width: 88vw;
  }
}

@media (max-width: 767px) {
  .calendar {
    width: 92vw;

    .container__item-day {
      font-size: 12px;
      padding: 1px;
    }
  }
}
</style>
