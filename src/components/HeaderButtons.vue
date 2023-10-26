<template>
  <div class="header__container">
    <h1 class="header__title">{{ pageTitle }}</h1>
    <div class="header__buttons">
      <button @click="goToFirstButton" class="header__button">{{ firstButtonLabel }}</button>
      <button @click="goToSecondButton" class="header__button">{{ secondButtonLabel }}</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    pageTitle: String,
    firstButtonLabel: String,
    secondButtonLabel: String,
    goToFirstButton: Function as PropType<(event: MouseEvent) => void | undefined>,
    goToSecondButton: Function as PropType<(event: MouseEvent) => void | undefined>,
  },
});
</script>
