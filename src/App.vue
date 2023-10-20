<template>
  <div class="app" :class="themeClass">
    <header>
      <nav class="header__navigation">
        <button class="header__button" @click="toggleTheme">{{ themeLabel }}</button>
      </nav>
    </header>
    <MainLayout />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import MainLayout from '@/views/MainLayout.vue';
import { useStore } from 'vuex';

export default defineComponent({
  components: {
    MainLayout,
  },
  setup() {
    const store = useStore();

    const isLightTheme = computed(() => store.state.isLightTheme);

    const themeClass = computed(() => (isLightTheme.value ? 'light' : 'dark'));
    const themeLabel = computed(() => (isLightTheme.value ? 'Night Mode' : 'Light Mode'));

    const toggleTheme = () => {
      store.commit('toggleTheme');
    };

    return {
      isLightTheme,
      themeClass,
      themeLabel,
      toggleTheme,
    };
  },
});
</script>

<style lang="scss">
@import './assets/styles/index.scss';

.header__navigation {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
