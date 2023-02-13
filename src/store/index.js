import { createPinia } from 'pinia';

const pinia = createPinia();
export function setUpStore(app) {
  app.use(pinia);
}
