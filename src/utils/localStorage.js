function isNotExist(value) {
    return value === null || typeof value === 'undefined';
}

export const setLocalItem =  (key, value) => {
    window.localStorage.setItem(key, JSON.stringify(value));
}

export const getLocalItem  = (key, value) => {
    const dataJSON = window.localStorage.getItem(key);
    if (isNotExist(dataJSON)) {
        return dataJSON;
    }
    try {
        const data = JSON.parse(dataJSON);
        return data;
    } catch (error) {
        return dataJSON;
    }
}

export const delLocalItem = (key) => {
    window.localStorage.removeItem(key);
}
