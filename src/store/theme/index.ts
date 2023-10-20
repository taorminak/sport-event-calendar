import actions from '@/store/events/actions';
import mutations from '@/store/events/mutations';
import getters from '@/store/events/getters';

const themeModule = {
  namespaced: true,
  state() {
    return {
      isLightTheme: true,
    };
  },
  getters,
  actions,
  mutations,
};

export default themeModule;
