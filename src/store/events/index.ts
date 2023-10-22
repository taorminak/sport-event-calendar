import actions from '@/store/events/actions';
import mutations from '@/store/events/mutations';
import getters from '@/store/events/getters';
import { SportEvent } from '@/types/interfaces/sportEvent';

const events = [] as SportEvent[];

const eventsModule = {
  namespaced: true,
  state() {
    return {
      events: events,
    };
  },
  getters,
  actions,
  mutations,
};

export default eventsModule;
