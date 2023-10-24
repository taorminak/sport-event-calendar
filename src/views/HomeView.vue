<template>
  <div class="header__container">
    <h1 class="header__title">2023 Sport Calendar</h1>
    <div>
      <button @click="goToAllEvents" class="header__button">Show All Events</button>
      <button @click="goToEvent" class="header__button">Add New Event &plus;</button>
    </div>
  </div>
  <main>
    <Calendar :date="state.state.calendarDate" :navigateTo="goToEvent" />
  </main>
</template>

<script setup lang="ts">
import Calendar from '@/components/SportCalendar.vue';
import { defineProps } from 'vue';
import state from '@/state';
import { PageNames } from '@/types/enums/pageNames';

const props = defineProps({
  navigateTo: Function,
  date: Date,
});

const goToEvent = () => {
  props.navigateTo?.(PageNames.EventPage);
};

const goToAllEvents = () => {
  props.navigateTo?.(PageNames.AllEvents);
};
</script>


