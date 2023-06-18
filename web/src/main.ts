// import './public-path';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from '@/App';
import router from '@/router';
import store, { storeKey } from '@/store';
import i18n from '@/language/i18n';
// import { bus } from '@/common/bus';
import bkUi from 'bkui-vue';
// import '@/common/bkmagic';
// import '@/common/directives';
// import '@icon-cool/bk-icon-gsekit';
import '@/common/svg';
import { textTool } from '@/common/text-tool';
import api, { injectCSRFTokenToHeaders } from '@/api';
import '@/mixins/emptyMixin.js';
import StatusView from '@/components/StatusView';
import TableException from '@/components/Empty/TableException';

// try {
//   const id = window.PROJECT_CONFIG.TAM_AEGIS_KEY;
//   if (id) {
//     const aegis = new window.Aegis({
//       id, // 项目key
//       reportApiSpeed: true, // 接口测速
//       reportAssetSpeed: true, // 静态资源测速
//       spa: true,
//     });
//     window.__aegisInstance = aegis;
//     Vue.config.errorHandler = function (err, vm, info) {
//       aegis.error(`Error: ${err.toString()}\nInfo: ${info}`);
//     };
//   }
// } catch (e) {
//   console.warn('前端监控接入出错', e);
// }

injectCSRFTokenToHeaders();
getUserInfo().then(() => {
  const app = createApp(App);
  app
    .use(createPinia())
    .use(store, storeKey)
    .use(router)
    .use(bkUi)
    .use(i18n);
  app
    .use('StatusView', StatusView)
    .use('TableException', TableException);
  app.provide('$http', api);
  app.provide('$textTool', textTool);

  app.mount('#app');

  if (process.env.NODE_ENV === 'development') {
    (app.config as any).devtools = true;
  }

  // global.bus = bus;

  window.i18n = i18n;
  window.mainComponent = app;
});

async function getUserInfo() {
  try {
    const res = await store.dispatch('meta/ajaxGetUserInfo');
    this.username = res.data.username;
    store.commit('updateUsername', res.data.username);
    store.commit('updateToggleStaticRouter', !!res.data.is_superuser);
    if (window.__aegisInstance) {
      window.__aegisInstance.setConfig({
        uin: res.data.username,
      });
    }
  } catch (e) {
    console.warn(e);
  }
}
