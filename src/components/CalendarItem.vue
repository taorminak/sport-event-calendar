<template>
  <div class="calendar__item-container">
    <div class="calendar__item-info">
      <span :class="itemClasses" class="calendar__item-date">{{ date.getDate() }}</span>
      <button class="calendar__item-button" @click="goToEvent">&plus;</button>
    </div>
    <div class="calendar__item-events" v-if="filteredEvents.length">
      <ul>
        <li class="calendar__item-event" v-for="event in filteredEvents" :key="event.id">
          <div>
            <a :name="event.name">{{ truncateEventName(event.name) }}</a>
          </div>
        </li>
        <div v-show="showEventsNumber" class="events-number">
          <a>{{ remainingEventsCount }} more...</a>
        </div>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import state from '../state';
import { SportEvent } from '@/types/interfaces/sportEvent';
import { getFormattedDate, isCurrentDate } from '@/helpers/date-helpers/dateHelpers';
import { loadEventsFromLocalStorage, fetchAndSaveEvents, sortEventsByTime } from '@/helpers/data-handling/dataHandling';

export default defineComponent({
  props: ['date', 'navigateTo'],
  data() {
    return {
      events: [] as SportEvent[],
      remainingEventsCount: 0,
      loaded: false,
    };
  },
  mounted() {
    fetchAndSaveEvents.call(this);
    loadEventsFromLocalStorage.call(this);
  },
  setup(props) {
    const localDate = props.date;
    const goToEvent = () => {
      props.navigateTo?.('eventPage');

      const selectedDay = new Date(localDate);

      const formattedDate = getFormattedDate(selectedDay);

      setFormattedDate(formattedDate);
    };

    const setFormattedDate = (formattedDate: string) => {
      state.state.selectedDate = formattedDate;
    };

    return {
      goToEvent,
    };
  },
  computed: {
    itemClasses() {
      return isCurrentDate(this.date) ? 'calendar__current-date' : '';
    },
    filteredEvents(): SportEvent[] {
      const filtered = this.filterAndSortEvents();

      this.updateRemainingEventsCount(filtered);

      return filtered.slice(0, 2);
    },
    showEventsNumber(): boolean {
      return this.remainingEventsCount > 0;
    },
  },
  methods: {
    filterAndSortEvents() {
      const eventDateToString = getFormattedDate(this.date);

      return sortEventsByTime(this.events.filter((event) => event.date === eventDateToString));
    },

    updateRemainingEventsCount(filteredEvents: SportEvent[]) {
      this.remainingEventsCount = filteredEvents.length - 2;
    },
    truncateEventName(name: string) {
      return name.length > 15 ? name.substring(0, 15) + '...' : name;
    },
  },
});
</script>

<style lang="scss" scoped>
$primaryColor: #ac9dc5;
$primaryHoverColor: #9886b6;

.calendar__item-container {
  padding: 5px;
  margin: 0;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  min-height: 100px;

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
      height: 25px;
      width: 25px;
    }

    .calendar__item-button {
      background-color: $primaryColor;
      color: #fff;
      border: none;
      padding: 1px 8px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 12px;

      &:hover {
        background-color: $primaryHoverColor;
      }
    }
  }

  .calendar__item-events ul {
    padding: 0;
    padding-left: 10px;
    padding-top: 3px;
    list-style: disc;
    margin: 0;

    .calendar__item-event {
      background-color: #f3f3f3;
      border: 1px solid #ddd;
      line-height: 0.9;
      padding: 1px;
      border-radius: 5px;
      font-size: 14px;
      text-align: left;
    }

    .events-number {
      text-align: center;
      text-align: center;
      font-size: 10px;
      margin: 0;
      padding: 0;
    }
  }
}
</style>
