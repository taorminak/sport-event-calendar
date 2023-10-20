import { MutationTree } from 'vuex';
import { EventState } from '@/types/interfaces/states';

const mutations: MutationTree<EventState> = {
  toggleTheme(state) {
    state.isLightTheme = !state.isLightTheme;
  },
};

export default mutations;
