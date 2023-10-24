<template>
  <div class="header__container">
    <h1 class="header__title">New Sport Event</h1>
    <div>
      <button @click="goToHome()" class="header__button">Go to Calendar</button>
    <button @click="goToAllEvents" class="header__button">Show All Events</button>
    </div>
  </div>
  <NewSportEvent />
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import NewSportEvent from '../components/NewSportEvent.vue';
import { PageNames } from '@/types/enums/pageNames';

const props = defineProps({
  navigateTo: Function,
});

const goToHome = () => {
  props.navigateTo?.(PageNames.Home);
};

const goToAllEvents = () => {
  props.navigateTo?.(PageNames.AllEvents);
};
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
