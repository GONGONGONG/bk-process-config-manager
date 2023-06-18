import { createRouter, createWebHistory } from 'vue-router';
import { useStore } from '@/store';

import http from '@/api';
const store = useStore();
window.showDeployTip = () => ({});

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/process-manage/status',
    },
    {
      path: '/process-manage',
      name: 'process-manage',
      redirect: '/process-manage/status',
      component: import('@/views/ProcessManage').catch(() => window.showDeployTip()),
      children: [
        {
          path: '/process-manage/status',
          name: 'process-manage-status',
          component: import(/* webpackChunkName: 'ProcessManageStatus' */'@/views/ProcessManage/Status').catch(() => window.showDeployTip()),
        },
        // {
        //   path: '/process-manage/release-config',
        //   name: 'process-manage-release',
        //   component: import(/* webpackChunkName: 'ProcessManageReleaseConfig' */'@/views/ProcessManage/ReleaseConfig').catch(() => window.showDeployTip()),
        // },
      ],
    },
    // {
    //   path: '/process-attr/:type?',
    //   name: 'process-attr',
    //   component: import(/* webpackChunkName: 'ProcessAttribute' */'@/views/ProcessAttribute').catch(() => window.showDeployTip()),
    //   props: true,
    // },
    // {
    //   path: '/config-file',
    //   name: 'config-file',
    //   redirect: '/config-file/template',
    //   component: import(/* webpackChunkName: 'ConfigFile' */'@/views/ConfigFile').catch(() => window.showDeployTip()),
    //   children: [
    //     {
    //       path: '/config-file/template',
    //       component: import(/* webpackChunkName: 'ConfigFileTemplate' */'@/views/ConfigFile/Template').catch(() => window.showDeployTip()),
    //       children: [
    //         {
    //           path: '',
    //           name: 'config-file-template-list', // 配置文件模板列表
    //           component: import(/* webpackChunkName: 'ConfigFileTemplateList' */'@/views/ConfigFile/Template/List').catch(() => window.showDeployTip()),
    //         },
    //         {
    //           path: '/config-file/template/:templateId/version',
    //           component: import(/* webpackChunkName: 'ConfigFileTemplateVersion' */'@/views/ConfigFile/Template/Version').catch(() => window.showDeployTip()),
    //           children: [
    //             {
    //               path: '',
    //               name: 'config-file-template-version-list', // 配置文件模板版本列表
    //               component: import(/* webpackChunkName: 'ConfigFileTemplateVersion' */'@/views/ConfigFile/Template/Version/List').catch(() => window.showDeployTip()),
    //             },
    //             {
    //               path: '/config-file/template/:templateId/version/:versionId/detail',
    //               name: 'config-file-template-version-detail', // 配置文件模板版本详情
    //               component: import(/* webpackChunkName: 'ConfigFileTemplateVersion' */'@/views/ConfigFile/Template/Version/Detail').catch(() => window.showDeployTip()),
    //             },
    //           ],
    //         },
    //         {
    //           path: '/config-file/template/:templateId/distribute', // 配置文件模板下发
    //           name: 'config-file-template-distribute',
    //           component: import(/* webpackChunkName: 'ConfigFileTemplateDistribute' */'@/views/ConfigFile/Template/Distribute').catch(() => window.showDeployTip()),
    //         },
    //         {
    //           path: '/config-file/template/:templateId/generate', // 配置文件模板生成
    //           name: 'config-file-template-generate',
    //           component: import(/* webpackChunkName: 'ConfigFileTemplateGenerate' */'@/views/ConfigFile/Template/Generate').catch(() => window.showDeployTip()),
    //         },
    //         {
    //           path: '/config-file/template/:templateId/check', // 配置检查
    //           name: 'config-file-template-check',
    //           component: import(/* webpackChunkName: 'ConfigFileTemplateCheck' */'@/views/ConfigFile/Template/Check').catch(() => window.showDeployTip()),
    //         },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   path: '/task-history',
    //   name: 'task-history',
    //   redirect: '/task-history/list',
    //   component: import(/* webpackChunkName: 'TaskHistory' */'@/views/TaskHistory').catch(() => window.showDeployTip()),
    //   children: [
    //     {
    //       path: '/task-history/list',
    //       name: 'task-history-list',
    //       component: import(/* webpackChunkName: 'TaskHistoryList' */'@/views/TaskHistory/List').catch(() => window.showDeployTip()),
    //     },
    //     {
    //       path: '/task-history/detail/:jobId?',
    //       name: 'task-history-detail',
    //       component: import(/* webpackChunkName: 'TaskHistoryDetail' */'@/views/TaskHistory/Detail').catch(() => window.showDeployTip()),
    //     },
    //   ],
    // },
    // {
    //   path: '/statistics',
    //   name: 'statistics',
    //   component: import(/* webpackChunkName: 'Statistics' */'@/views/Statistics').catch(() => window.showDeployTip()),
    //   beforeEnter(to, from, next) {
    //     if (store.state.showStaticRouter) {
    //       next();
    //     } else {
    //       next({
    //         name: 'process-manage',
    //         replace: true,
    //       });
    //     }
    //   },
    // },
    // {
    //   path: '*',
    //   name: '404',
    //   component: import(/* webpackChunkName: 'none' */'@/views/NotFound').catch(() => window.showDeployTip()),
    // },
  ],
});

const cancelRequest = async () => {
  const allRequest = http.queue.get();
  const requestQueue = allRequest.filter(request => request.cancelWhenRouteChange);
  await http.cancel(requestQueue.map(request => request.requestId));
};

// router.beforeEach(async (to, from, next) => {
//   router.__from_name = from.name;
//   await cancelRequest();
//   if (!to.query.biz && store.state.bizId) {
//     // 是否 replace
//     let replace = false;
//     const replaceNames = ['config-file-template-version-detail', 'config-file-template-version-preview'];
//     for (const name of replaceNames) {
//       if (from.name === name && to.name === name) {
//         replace = true;
//         break;
//       }
//     }
//     // 给路由统一带上业务ID
//     next({
//       name: to.name,
//       params: to.params,
//       replace,
//       query: {
//         ...to.query,
//         biz: store.state.bizId,
//       },
//     });
//   } else {
//     next();
//   }
// });

export default router;
