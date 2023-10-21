import { MutationTree } from 'vuex';
import { EventState } from '@/types/interfaces/states';

const mutations: MutationTree<EventState> = {
  addEvent(state, event) {
    state.events.push(event);
    console.log(state.events);
  },
  toggleTheme(state) {
    state.isLightTheme = !state.isLightTheme;
  },
};

export default mutations;