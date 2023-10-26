<template>
  <div class="header__container">
    <HeaderButtons
      pageTitle="2023 Sport Calendar"
      firstButtonLabel="Go to Calendar"
      secondButtonLabel="Add New Event &plus;"
      :goToFirstButton="goToHome"
      :goToSecondButton="goToEvent"
    />
  </div>
  <EventsList />
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import EventsList from '@/components/EventsList.vue';
import HeaderButtons from '@/components/HeaderButtons.vue';
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
