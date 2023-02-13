import { defineStore } from 'pinia';
import { APP_STORE } from '../UNIQUE_ID_CONSTANTS';
export const useAppStore = defineStore({
  id: APP_STORE,
  state: () => ({
    theme: 'light'
  }),
  actions: {}
});
