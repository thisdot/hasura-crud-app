import Vue from 'vue';
import VueX from 'vuex';

import accountModule from './modules/account.module';

Vue.use(VueX);

export default new VueX.Store({
  modules: {
      account: accountModule,
  },
});
