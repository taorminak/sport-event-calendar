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
import { defineComponent, ref, onMounted } from 'vue';
import state from '../state';
import { mapState } from 'vuex';
import { RootState } from '@/types/interfaces/states';
import { SportEvent } from '@/types/interfaces/sportEvent';
import SportEventsData from '@/data/sportData.json';
import { SportEventData } from '@/types/interfaces/sportEventData';
import { v4 as uuidv4 } from 'uuid';

export default defineComponent({
  props: ['date', 'navigateTo'],
  setup(props) {
    const localDate = props.date;
    const remainingEventsCount = ref(0);
    const allEvents = ref([]);
    //имеет такое же название как получаемые events из vuex
    const events = ref<SportEvent[]>([]);

    const loadEventsFromLocalStorage = () => {
      try {
        const savedEvents = localStorage.getItem('events');

        if (savedEvents) {
          events.value = JSON.parse(savedEvents);
        }
      } catch (error) {
        console.error('Error loading events from local storage:', error);
      }
    };

    onMounted(() => {
      loadEventsFromLocalStorage();

      // ошибки Typescript
      const eventsFromJSON = SportEventsData.data.map((eventData: SportEventData) => {
        const resultString = `${eventData.result.homeGoals} : ${eventData.result.awayGoals}`;
        const nameString =
          (eventData.homeTeam ? eventData.homeTeam.officialName : '') +
          ' - ' +
          (eventData.awayTeam ? eventData.awayTeam.officialName : '');

        return {
          id: uuidv4(),
          name: nameString,
          description: eventData.originCompetitionName + ' - ' + eventData.season || '',
          status: eventData.status || '',
          result: resultString || '',
          date: eventData.dateVenue,
          time: eventData.timeVenueUTC,
        };
      });

      const plainEvents = events.value.map((event) => ({ ...event }));

      allEvents.value = plainEvents.concat(eventsFromJSON);
    });

    const goToEvent = () => {
      props.navigateTo?.('eventPage');

      const selectedDay = new Date(localDate);

      const formattedDate = formatSelectedDate(selectedDay);

      setFormattedDate(formattedDate);
    };
    //не получилось воспользоваться методом
    const formatSelectedDate = (date: Date): string => {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');

      return `${year}-${month}-${day}`;
    };

    const setFormattedDate = (formattedDate: string) => {
      state.state.selectedDate = formattedDate;
    };

    return {
      goToEvent,
      remainingEventsCount,
      events,
      allEvents,
    };
  },
  computed: {
    ...mapState<RootState>({
      events: (state: RootState) => state.events.events,
    }),
    itemClasses() {
      return this.isCurrentDate(this.date) ? 'calendar__current-date' : '';
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
    getFormattedDate(date: Date): string {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');

      return `${year}-${month}-${day}`;
    },
    filterAndSortEvents() {
      const eventDateToString = this.getFormattedDate(this.date);

      //ошибка Typescript: Proxy Array
      return this.sortEvents(this.allEvents.filter((event) => event.date === eventDateToString));
    },
    isCurrentDate(checkDate: Date) {
      const currentDate = new Date();

      currentDate.setHours(0, 0, 0, 0);

      const itemDate = new Date(checkDate);

      itemDate.setHours(0, 0, 0, 0);

      return currentDate.toISOString().split('T')[0] === itemDate.toISOString().split('T')[0];
    },
    sortEvents(events: SportEvent[]) {
      return events.sort((a, b) => {
        const timeA = a.time.split(':');
        const timeB = b.time.split(':');

        const hoursA = parseInt(timeA[0]);
        const minutesA = parseInt(timeA[1]);
        const hoursB = parseInt(timeB[0]);
        const minutesB = parseInt(timeB[1]);

        if (hoursA === hoursB) {
          return minutesA - minutesB;
        }

        return hoursA - hoursB;
      });
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
