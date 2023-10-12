<template>
  <div class="app" :class="themeClass">
    <header>
      <nav>
        <button class="header__button" @click="toggleTheme">{{ themeLabel }}</button>
        <MainLayout />
      </nav>
    </header>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MainLayout from '@/views/MainLayout.vue';

export default defineComponent({
  components: {
    MainLayout,
  },
  data() {
    return {
      isLightTheme: this.getThemeFromLocalStorage() ?? true,
    };
  },
  computed: {
    themeClass(): string {
      return this.isLightTheme ? 'light' : 'dark';
    },
    themeLabel(): string {
      return this.isLightTheme ? 'Night Mode' : 'Light Mode';
    },
  },
  methods: {
    toggleTheme(): void {
      this.isLightTheme = !this.isLightTheme;
      this.saveThemeToLocalStorage();
    },
    getThemeFromLocalStorage(): boolean {
      return localStorage.getItem('isLightTheme') === 'true';
    },
    saveThemeToLocalStorage(): void {
      localStorage.setItem('isLightTheme', this.isLightTheme.toString());
    },
  },
});
</script>

<style lang="scss">
@import './assets/styles/index.scss';
</style>
