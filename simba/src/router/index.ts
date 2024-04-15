/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'

const routes = [
  {
    path:      '/',
    component: () => import('../layouts/default.vue'),
    children:  [
      {
        path:      'login',
        name:      'login',
        component: () => import('../pages/registretion.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  // extendRoutes: setupLayouts,
  routes: routes,
})

export default router
