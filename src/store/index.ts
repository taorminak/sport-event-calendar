import { createStore } from 'vuex';
import eventsModule from '@/store/events/index';
import themeModule from '@/store/theme/index';

const store = createStore({
  modules: {
    events: eventsModule,
    theme: themeModule,
  },
});

export default store;
