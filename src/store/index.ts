import { createStore } from 'vuex';
import eventsModule from '@/store/events/index';
import themeModule from './theme';

const store = createStore({
  modules: {
    events: eventsModule,
    theme: themeModule,
  },
});

export default store;
