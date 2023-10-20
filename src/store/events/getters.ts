import { GetterTree } from 'vuex';
import { EventState, RootState } from '@/types/interfaces/states';

const getters: GetterTree<EventState, RootState> = {
  allEvents(state) {
    return state.events;
  },
};

export default getters;
