import './public-path';
import Vue from 'vue';

import App from '@/App';
import router from '@/router';
import store from '@/store';
import i18n from '@/language/i18n';
import { bus } from '@/common/bus';
import { injectCSRFTokenToHeaders } from '@/api';
import '@/common/plugin';
// import '@icon-cool/bk-icon-gsekit';

try {
  const id = window.PROJECT_CONFIG.TAM_AEGIS_KEY;
  if (id) {
    const aegis = new window.Aegis({
      id, // 项目key
      reportApiSpeed: true, // 接口测速
      reportAssetSpeed: true, // 静态资源测速
      spa: true,
    });
    window.__aegisInstance = aegis;
    Vue.config.errorHandler = function (err, vm, info) {
      aegis.error(`Error: ${err.toString()}\nInfo: ${info}`);
    };
  }
} catch (e) {
  console.warn('前端监控接入出错', e);
}

Vue.config.devtools = true;

injectCSRFTokenToHeaders();
getUserInfo().then(() => {
  global.bus = bus;
  global.i18n = i18n;
  global.mainComponent = new Vue({
    el: '#app',
    router,
    store,
    i18n,
    components: { App },
    template: '<App/>',
  });
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
