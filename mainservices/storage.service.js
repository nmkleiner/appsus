'use strict'

export default {
    store,
    load
}

function store(key, any) {
    localStorage[key] = JSON.stringify(any);
    return Promise.resolve();
}

function load(key) {
    var str = localStorage[key] || 'null';
    return Promise.resolve(JSON.parse(str));
}
