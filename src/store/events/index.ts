import actions from '@/store/events/actions';
import mutations from '@/store/events/mutations';
import getters from '@/store/events/getters';

const eventsModule = {
  namespaced: true,
  state() {
    return {
      events: [],
    };
  },
  getters,
  actions,
  mutations,
};

export default eventsModule;
