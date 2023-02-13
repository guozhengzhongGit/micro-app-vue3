import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/pages/home';
// import errRoute from './error';
import { createRouterGuards } from './router-guards';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }
];

// routes.push(...errRoute);

let history = null;
let router = null;

export async function registerRouter(app) {
  history = createWebHistory('/vue3/');
  router = createRouter({
    history,
    routes
  });
  createRouterGuards(router);
  app.use(router);
  await router.isReady();
}

export function clearRouter() {
  history = null;
  router = null;
}
