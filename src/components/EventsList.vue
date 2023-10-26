<template>
  <div class="event-table">
    <div :class="['event-row', 'event-table-header', themeClass]">
      <div class="event-date">Date</div>
      <div class="event-time">Time</div>
      <div class="event-name">Name of event</div>
    </div>

    <div v-for="event in sortedEvents" :key="event.id" :class="['event-row', themeClass]">
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
import { sortEventsByDateAndTime } from '@/helpers/data-handling/dataHandling';

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
    isLightTheme() {
      return this.$store.state.theme.isLightTheme;
    },
    sortedEvents(): SportEvent[] {
      const events = this.$store.state.events.events;
      const sorted = this.sortEvents(events);

      return sorted;
    },
    themeClass() {
      return this.isLightTheme ? 'light' : 'dark';
    },
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
$primaryColor: #8776a2;
$primaryHoverColor: #927faf;
.event-table {
  display: flex;
  flex-direction: column;
  width: 80vw;
  margin: auto;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  margin-top: 5px;

  .event-table-header {
    font-size: large;
    font-weight: bold;
  }

  .event-row {
    display: flex;
    justify-content: space-between;
    width: 80vw;
    padding: 8px;
    border: 0.5px solid #9788af;

    &.light {
      background-color: #f0f0f0;
    }

    &.dark {
      background-color: #bdb2cf;
      color: #27263d;
    }
  }

  .event-name {
    flex: 2;
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
