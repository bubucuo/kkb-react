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
          component: '@/pages/index',
        },

        {
          path: '/about',
          component: '@/pages/about',
        },
        {
          path: '/more',
          component: '@/pages/more/index.js',
        },
        {
          path: '/product/:id',
          component: '@/pages/product/[id].tsx',
        },
        {
          component: '@/pages/404/index.tsx',
        },
      ],
    },
  ],
});
