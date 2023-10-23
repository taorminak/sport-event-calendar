<script setup lang="ts">
import { defineProps } from 'vue';
import EventsList from '@/components/EventsList.vue';

const props = defineProps({
  navigateTo: Function,
});

const goToHome = () => {
  props.navigateTo?.('home');
};
</script>

<template>
  <div class="header__container">
    <h1 class="header__title">All Sport Events</h1>
    <button @click="goToHome()" class="header__button">Go to Calendar</button>
  </div>
  <EventsList />
</template>
