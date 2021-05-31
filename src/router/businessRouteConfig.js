const businessRoutes = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/home/index.vue'),
    meta: {
      keepAlive: false,
      requireAuth: true,
      isSinglePage: false
    }
  }
];

export default businessRoutes;
