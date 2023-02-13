if (window.__POWERED_BY_QIANKUN__) {
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}
import { createApp } from 'vue';
import App from './app.vue';
import { registerRouter, clearRouter } from './router';
// import { registerVant } from './plugins';
import { setUpStore } from './store';

let app;

async function setUpApp(props) {
  const { container } = props;
  app = createApp(App);
  setUpStore(app);
  await registerRouter(app);
  app.mount(container ? container.querySelector('#app') : '#app');
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  setUpApp({});
}

export async function bootstrap() {
  console.log('[vue] vue app bootstraped');
}
export async function mount(props) {
  console.log('[vue] props from main framework', props);
  setUpApp(props);
}
export async function unmount() {
  app = null;
  clearRouter();
}
