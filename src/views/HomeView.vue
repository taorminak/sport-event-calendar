<template>
  <div class="header__container">
    <HeaderButtons
      pageTitle="2023 Sport Calendar"
      firstButtonLabel="Show All Events"
      secondButtonLabel="Add New Event &plus;"
      :goToFirstButton="goToAllEvents"
      :goToSecondButton="goToEvent"
    />
  </div>
  <main>
    <Calendar :date="state.state.calendarDate" :navigateTo="goToEvent" />
  </main>
</template>

<script setup lang="ts">
import Calendar from '@/components/SportCalendar.vue';
import HeaderButtons from '@/components/HeaderButtons.vue';
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
