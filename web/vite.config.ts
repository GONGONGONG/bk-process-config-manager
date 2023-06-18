import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

let localEnv: any = {};
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  localEnv = require('./local_env.js') || {};
} catch (_) {
  console.log(_);
}


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@types': fileURLToPath(new URL('./src/@types', import.meta.url)),
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue'], // 操作配置简化 - 不建议忽略.vue后缀
  },
  server: {
    host: localEnv.devHost,
    port: localEnv.port || 5000,
    fs: {
      strict: false,
    },
    // proxy: {
    //   '/api': {
    //     target: localEnv.proxyTableTarget,
    //     changeOrigin: true,
    //   },
    //   '/version_log': {
    //     target: '',
    //     changeOrigin: true,
    //     secure: false,
    //     toProxy: true,
    //   },
    // },
  },
});
