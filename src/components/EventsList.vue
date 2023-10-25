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
import { defineComponent } from 'vue';
import { SportEvent } from '@/types/interfaces/sportEvent';
import {
  loadEventsFromLocalStorage,
  fetchAndSaveEvents,
  sortEventsByDateAndTime,
} from '@/helpers/data-handling/dataHandling';

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
  async mounted() {
    const fetchedEvents = fetchAndSaveEvents();
    const loadedEventsLocalStorage = await loadEventsFromLocalStorage();

    if (fetchedEvents) {
      this.events = this.events.concat(fetchedEvents);
    }

    if (loadedEventsLocalStorage) {
      this.events = this.events.concat(loadedEventsLocalStorage);
    }
  },
  methods: {
    sortEvents(events: SportEvent[]): SportEvent[] {
      sortEventsByDateAndTime(events);

      return events;
    },
  },
});
</script>

<style lang="scss" scoped>
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
    border: 0.5px solid #ac9dc5;
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
