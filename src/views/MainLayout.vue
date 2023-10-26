<template>
  <div class="page-container">
    <component :is="currentPageComponent" :navigateTo="navigateTo"></component>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Home from './HomeView.vue';
import EventPage from './EventPageView.vue';
import AllEventsPage from './EventListView.vue';
import { PageNames } from '@/types/enums/pageNames';

export default defineComponent({
  data() {
    return {
      currentPage: PageNames.Home,
    };
  },
  computed: {
    currentPageComponent() {
      const pages: Record<PageNames, typeof Home | typeof EventPage | typeof AllEventsPage> = {
        [PageNames.EventPage]: EventPage,
        [PageNames.AllEvents]: AllEventsPage,
        [PageNames.Home]: Home,
      };

      return pages[this.currentPage] || Home;
    },
  },
  methods: {
    navigateTo(page: PageNames) {
      this.currentPage = page;
    },
  },
});
</script>
