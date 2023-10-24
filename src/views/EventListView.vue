<template>
  <div class="header__container">
    <h1 class="header__title">All Sport Events</h1>
    <div>
      <button @click="goToHome()" class="header__button">Go to Calendar</button>
      <button @click="goToEvent" class="header__button">Add New Event &plus;</button>
    </div>
  </div>
  <EventsList />
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import EventsList from '@/components/EventsList.vue';
import { PageNames } from '@/types/enums/pageNames';

const props = defineProps({
  navigateTo: Function,
});

const goToEvent = () => {
  props.navigateTo?.(PageNames.EventPage);
};

const goToHome = () => {
  props.navigateTo?.(PageNames.Home);
};
</script>


