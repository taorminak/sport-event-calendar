import { GetterTree } from 'vuex';
import { EventState, RootState } from '@/types/interfaces/states';

const getters: GetterTree<EventState, RootState> = {
  currentTheme(state) {
    return state.isLightTheme ? 'light' : 'dark';
  },
};

export default getters;
