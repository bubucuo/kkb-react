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
          redirect: '/welcome',
          component: '@/pages/about',
        },

        {
          path: '/product/:id',
          component: '@/pages/product/_layout',
          routes: [
            {
              path: '/product/:id',
              component: '@/pages/product/[id]',
            },
          ],
        },
        {
          path: '/more',
          component: '@/pages/more/',
        },
        {
          component: '@/pages/404/',
        },
      ],
    },
  ],
});
