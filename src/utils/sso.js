import { delLocalItem } from './localStorage';
import { ACCESS_TOKEN_KEY } from '@/router/constants';

const ssoAppIdMap = {
    // 素质 测试
    test: 1504040528,
};

function getAppId() {
    console.log(process.env.buildTarget)
    return ssoAppIdMap[process.env.buildTarget] || undefined;
}

function generateSSOLoginUrl (appId, customParams) {
    let urlPrefix = 'https://sso.100tal.com/portal/login';
    const paramKeys = Object.keys(customParams || {});
    const paramsString = paramKeys.map(k => `${k}=${customParams[k]}`).join('&');
    const params = paramKeys.length > 0 ? `?${paramsString}` : '';
    return `${urlPrefix}/${appId}${params}`;
}
function ssoLogin(params) {
    const url = generateSSOLoginUrl(getAppId(), params);
    delLocalItem(ACCESS_TOKEN_KEY);
    alert(url);
    window.location.href = url;
}

export function redirectSSO(isLogout, params) {
    if (isLogout) {}
    else {
        ssoLogin(params);
    }
}
