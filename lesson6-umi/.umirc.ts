import { defineConfig } from 'umi';

export default defineConfig({
  layout: {},
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/',
      component: '@/layout/index',
      routes: [
        {
          path: '/',
          redirect: '/welcome',
          component: '@/pages/index',
        },
        {
          path: '/about',
          component: '@/pages/about',
        },
        {
          path: '/more',
          component: '@/pages/more/index',
        },
        {
          path: '/product/:id',
          component: '@/pages/product/_layout',
          routes: [{ path: '/product/:id', component: '@/pages/product/[id]' }],
        },
      ],
    },
  ],
});
