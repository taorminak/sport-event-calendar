import actions from '@/store/theme/actions';
import mutations from '@/store/theme/mutations';
import getters from '@/store/theme/getters';

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
