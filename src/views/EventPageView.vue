<template>
  <div class="header__container">
    <HeaderButtons
      pageTitle="2023 Sport Calendar"
      firstButtonLabel="Go to Calendar"
      secondButtonLabel="Show All Events"
      :goToFirstButton="goToHome"
      :goToSecondButton="goToAllEvents"
    />
  </div>
  <NewSportEvent />
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import HeaderButtons from '@/components/HeaderButtons.vue';
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
