<script setup lang="ts">
import { defineProps } from 'vue';
import NewSportEvent from '../components/NewSportEvent.vue';

const props = defineProps({
  navigateTo: Function,
});

const goToHome = () => {
  props.navigateTo?.('home');
};
</script>

<template>
  <div class="header__container">
    <h1 class="header__title">New Sport Event</h1>
    <button @click="goToHome()" class="header__button">Go to Calendar</button>
  </div>
  <NewSportEvent />
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
