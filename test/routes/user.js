'use strict';

module.exports = [{
    method: 'GET',
    path: 'index',
    options: {
        auth: false
    },
    handler: (request, h) => {

        return 'get user/index';
    }
}, {
    method: 'GET',
    path: 'dashboard',
    options: {
        auth: false
    },
    handler: (request, h) => {

        return 'get user/dashboard';
    }
}];
