<script setup lang="ts">
import Calendar from '@/components/SportCalendar.vue';
import { defineProps } from 'vue';
import state from '@/state';

const props = defineProps({
  navigateTo: Function,
  date: Date,
});

const goToEvent = () => {
  props.navigateTo?.('eventPage');
};
</script>

<template>
  <div class="header__container">
    <h1 class="header__title">2023 Sport Calendar</h1>
    <button @click="goToEvent" class="header__button">Add New Event</button>
  </div>
  <main>
    <Calendar :date="state.state.calendarDate" :navigateTo="goToEvent" />
  </main>
</template>

<style lang="scss"></style>
