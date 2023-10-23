<template>
  <div>
    <component :is="currentPageComponent" :navigateTo="navigateTo"></component>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Home from './HomeView.vue';
import EventPage from './EventPageView.vue';
import AllEventsPage from './EventListView.vue';

export default defineComponent({
  data() {
    return {
      currentPage: 'home',
    };
  },
  computed: {
    currentPageComponent() {
      const pages: Record<string, typeof Home | typeof EventPage | typeof AllEventsPage> = {
        eventPage: EventPage,
        allEvents: AllEventsPage,
        home: Home,
      };

      return pages[this.currentPage] || Home;
    },
  },
  methods: {
    navigateTo(page: string) {
      this.currentPage = page;
    },
  },
});
</script>
