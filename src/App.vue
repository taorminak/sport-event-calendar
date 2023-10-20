<template>
  <div class="app" :class="{ light: isLightTheme, dark: !isLightTheme }">
    <header>
      <nav class="header__navigation">
        <button class="header__button" @click="toggleTheme">{{ isLightTheme ? 'Night Mode' : 'Light Mode' }}</button>
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

    const isLightTheme = computed(() => store.state.theme.isLightTheme);

    const toggleTheme = () => {
      store.commit('theme/toggleTheme');
    };

    return {
      isLightTheme,
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
