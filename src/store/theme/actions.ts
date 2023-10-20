import { ActionTree } from 'vuex';
import { EventState, RootState } from '@/types/interfaces/states';

const actions: ActionTree<EventState, RootState> = {
  toggleTheme(context) {
    context.commit('toggleTheme');
  },
};

export default actions;
