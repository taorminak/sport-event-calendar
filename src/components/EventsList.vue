<template>
  <div class="event-table">
    <div class="event-row event-table-header">
      <div class="event-date">Date</div>
      <div class="event-time">Time</div>
      <div class="event-name">Name of event</div>
    </div>

    <div v-for="event in sortedEvents" :key="event.id" class="event-row">
      <div class="event-date">{{ event.date }}</div>
      <div class="event-time">{{ event.time }}</div>
      <div class="event-name">{{ event.name }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { SportEvent } from '@/types/interfaces/sportEvent';
import SportEventsData from '@/data/sportData.json';
import { v4 as uuidv4 } from 'uuid';

const loaded = ref(false);
export default defineComponent({
  data() {
    return {
      events: [] as SportEvent[],
      loaded: false,
    };
  },
  computed: {
    sortedEvents(): SportEvent[] {
      const sorted = this.sortEvents(this.events);

      return sorted;
    },
  },
  mounted() {
    this.fetchAndSaveEvents();
    this.loadEventsFromLocalStorage();
  },
  methods: {
    fetchAndSaveEvents() {
      loaded.value = true;

      const eventsFromJSON = SportEventsData.data.map((eventData) => {
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

      this.events = eventsFromJSON;
    },
    loadEventsFromLocalStorage() {
      try {
        const savedEvents = localStorage.getItem('events');

        if (savedEvents) {
          const parsedEvents = JSON.parse(savedEvents);

          this.events = this.events.concat(parsedEvents);
        }
      } catch (error) {
        console.error('Error loading events from local storage:', error);
      }
    },
    sortEvents(events: SportEvent[]) {
      return events.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);

        if (dateA.getTime() !== dateB.getTime()) {
          return dateA.getTime() - dateB.getTime();
        }

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
  },
});
</script>

<style scoped lang="scss">
.event-table {
  display: flex;
  flex-direction: column;
  width: 80vw;
  margin: auto;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  margin-top: 5px;
  background-color: #f0f0f0;

  .event-row {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .event-name {
    flex: 2;
    font-weight: bold;
  }

  .event-time,
  .event-date {
    flex: 1;
    text-align: left;
  }
}
</style>
