import { createStore } from 'vuex';
import eventsModule from '@/store/events/index';

const store = createStore({
  modules: {
    events: eventsModule,
  },
});

export default store;
