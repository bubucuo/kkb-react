import { defineConfig } from 'umi';

export default defineConfig({
  layout: {},
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/',
      component: '@/pages/index',
      redirect: '/welcome',
    },
    {
      path: '/about',
      component: '@/pages/about',
    },
    {
      path: '/more',
      component: '@/pages/more/index',
    },
    // { path: '/product/:id', component: '@/pages/product/[id]' },
    {
      path: '/product/:id',
      component: '@/pages/product/_layout',
      routes: [{ path: '/product/:id', component: '@/pages/product/[id]' }],
    },
  ],
});
// <Route path={} component={component}/>
