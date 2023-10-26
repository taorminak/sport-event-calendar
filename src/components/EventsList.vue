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
      <a class="event-name" :name="event.name" @click.prevent="openModal(event)">{{ event.name }}</a>
    </div>
    <EventDetail v-if="showModal" :event="selectedEvent" @close="closeModal" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { SportEvent } from '@/types/interfaces/sportEvent';
import EventDetail from './EventDetail.vue';
import {
  loadEventsFromLocalStorage,
  fetchAndSaveEvents,
  sortEventsByDateAndTime,
} from '@/helpers/data-handling/dataHandling';

export default defineComponent({
  components: {
    EventDetail,
  },
  data() {
    return {
      events: [] as SportEvent[],
      loaded: false,
      showModal: false,
      selectedEvent: {},
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
    openModal(event: SportEvent) {
      this.showModal = true;
      this.selectedEvent = event;
    },
    closeModal() {
      this.showModal = false;
    },
  },
});
</script>

<style lang="scss" scoped>
$primaryColor: #ac9dc5;
$primaryHoverColor: #9886b6;
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

  a.event-name {
    text-decoration: none;
    cursor: pointer;
    &:hover {
      color: $primaryColor;
    }
  }

  .event-time,
  .event-date {
    flex: 1;
    text-align: left;
  }
}
</style>
