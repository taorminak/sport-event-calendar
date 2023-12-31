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
            <a :name="event.name" @click.prevent="openModal(event)">{{ truncateEventName(event.name) }}</a>
          </div>
        </li>
        <div v-show="showEventsNumber" class="events-number">
          <a>{{ remainingEventsCount }} more...</a>
        </div>
      </ul>
      <EventDetail v-if="showModal" :event="selectedEvent" @close="closeModal" />
    </div>
  </div>
</template>

<script lang="ts">
import state from '@/state';
import { defineComponent, computed } from 'vue';
import { PageNames } from '@/types/enums/pageNames';
import { SportEvent } from '@/types/interfaces/sportEvent';
import EventDetail from './EventDetail.vue';
import { getFormattedDate, isCurrentDate } from '@/helpers/date-helpers/dateHelpers';
import { fetchAndSaveEvents, sortEventsByTime } from '@/helpers/data-handling/dataHandling';
import { loadEventsFromLocalStorage } from '@/helpers/data-handling/localStorageHelpers';

export default defineComponent({
  props: ['date', 'navigateTo'],
  components: {
    EventDetail,
  },
  data() {
    return {
      events: [] as SportEvent[],
      remainingEventsCount: 0,
      loaded: false,
      showModal: false,
      selectedEvent: {},
    };
  },
  async mounted() {
    const fetchedEvents = fetchAndSaveEvents();
    const loadedEventsLocalStorage = loadEventsFromLocalStorage();

    if (fetchedEvents) {
      this.events = this.events.concat(fetchedEvents);
    }

    if (loadedEventsLocalStorage) {
      this.events = this.events.concat(loadedEventsLocalStorage);
    }

    this.$store.commit('events/UPDATE_EVENTS', this.events);
  },
  setup(props) {
    const localDate = computed(() => {
      return new Date(props.date);
    });

    const goToEvent = () => {
      props.navigateTo?.(PageNames.EventPage);

      const selectedDay = new Date(localDate.value);

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
      const events = this.$store.state.events.events;
      const filtered = this.filterAndSortEvents(events);

      this.updateRemainingEventsCount(filtered);

      return filtered.slice(0, 2);
    },
    showEventsNumber(): boolean {
      return this.remainingEventsCount > 0;
    },
  },
  methods: {
    filterAndSortEvents(events: SportEvent[]): SportEvent[] {
      const eventDateToString = getFormattedDate(this.date);

      return sortEventsByTime(events.filter((event: SportEvent) => event.date === eventDateToString));
    },

    updateRemainingEventsCount(filteredEvents: SportEvent[]): void {
      this.remainingEventsCount = filteredEvents.length - 2;
    },
    truncateEventName(name: string): string {
      return name.length > 15 ? name.substring(0, 15) + '...' : name;
    },
    openModal(event: SportEvent): void {
      this.showModal = true;
      this.selectedEvent = event;
    },
    closeModal(): void {
      this.showModal = false;
    },
  },
});
</script>

<style lang="scss" scoped>
$primaryColor: #8776a2;
$primaryHoverColor: #927faf;

.calendar__item-container {
  padding: 5px;
  min-height: 100px;
  margin: 0;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);

  .calendar__item-info {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .calendar__current-date {
      background-color: red;
      color: #dcdce7;
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
      background-color: #c7bed5;
      line-height: 0.9;
      padding-top: 2px;
      padding-bottom: 2px;
      border-radius: 3px;
      font-size: 14px;
      text-align: left;

      a {
        text-decoration: none;
        cursor: pointer;
        padding-left: 3px;

        @media (hover: hover) {
          &:hover {
            color: $primaryHoverColor;
          }
        }
      }
    }

    .events-number {
      text-align: center;
      text-align: center;
      font-size: 10px;
      margin: 0;
      padding: 0;
    }
  }

  @media (max-width: 1023px) {
    .calendar__item-container {
      padding: 3px;
      min-height: 80px;
    }
  }

  @media (max-width: 767px) {
    .calendar__item-container {
      padding: 3px;
    }

    .calendar__item-info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      min-height: 75px;
      margin: 5px;
    }

    .calendar__item-events {
      display: none;
    }

    .calendar__item-info {
      .calendar__current-date {
        height: 15px;
        width: 15px;
      }

      .calendar__item-date {
        height: 20px;
        width: 20px;
      }
    }
  }
}
</style>
