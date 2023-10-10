<template>
  <div class="app" :class="themeClass">
    <header>
      <nav>
        <button class="header__button-mode" @click="toggleTheme">{{ themeLabel }}</button>
        <div>Hello</div>
      </nav>
    </header>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
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

.header__button-mode {
  padding: 10px 20px;
  background-color: #ac9dc5;
  color: #3b3a3d;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;

  &:hover {
    background-color: #8b7aa8;
  }
}
</style>
