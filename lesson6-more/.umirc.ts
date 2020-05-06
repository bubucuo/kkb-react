import { defineConfig } from 'umi';

export default defineConfig({
  layout: {
    name: '开课吧',
    locale: false,
    logo: 'https://img.kaikeba.com/web/kkb_index/img_index_logo.png',
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      // path: '/',
      // component: '@/layout/index',
      // routes: [
      // {
      path: '/',
      component: '@/pages/index',
      name: '首页',
    },
    {
      path: '/about',
      component: '@/pages/about',
      name: '关于',
    },
    {
      path: '/more',
      component: '@/pages/more/index',
      name: '更多',
    },
    // { path: '/product/:id', component: '@/pages/product/[id]' },
    {
      path: '/product/:id',
      component: '@/pages/product/_layout',
      routes: [{ path: '/product/:id', component: '@/pages/product/[id]' }],
    },
    { component: '@/pages/404/index' },
    //   ],
    // },
  ],
});
