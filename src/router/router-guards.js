import { isNavigationFailure } from 'vue-router';
import { LOGIN_NAME, WHITE_NAME_LIST, ACCESS_TOKEN_KEY } from './constants';
import { getLocalItem } from '@/utils/localStorage';

import { redirectSSO } from '../utils/sso';
export function createRouterGuards(router) {
    console.log(router.getRoutes());
    router.beforeEach(async (to, from, next) => {
        const hasToken = getLocalItem(ACCESS_TOKEN_KEY);
        if (!hasToken) {
            // redirectSSO()
            next()
        } else {
            next()
        }
    })
}
