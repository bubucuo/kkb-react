import { defineConfig } from 'umi';

export default defineConfig({
  //base: '/kkb', //基准值
  hash: true,
  layout: {},
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/login', component: '@/pages/login/index' },
    {
      path: '/more',
      component: '@/pages/more/index',
      wrappers: ['@/wrappers/auth/'],
    },
    {
      path: '/channel',
      component: '@/pages/channel/index',
      wrappers: ['@/wrappers/auth/'],
    },
    { path: '/about', component: '@/pages/about' },
  ],
});
