<template>
  <div>
    <component :is="currentPageComponent" :navigateTo="navigateTo"></component>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Home from './HomeView.vue';
import EventPage from './EventPageView.vue';

export default defineComponent({
  components: {
    Home,
    EventPage,
  },
  data() {
    return {
      currentPage: 'home',
    };
  },
  computed: {
    currentPageComponent() {
      return this.currentPage === 'eventPage' ? EventPage : Home;
    },
  },
  methods: {
    navigateTo(page: 'home' | 'eventPage') {
      this.currentPage = page;
    },
  },
});
</script>
