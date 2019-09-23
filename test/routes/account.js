'use strict';

module.exports = [{
    method: 'GET',
    path: 'login',
    options: {
        auth: false
    },
    handler: function (request, h) {

        return 'get account/login';
    }
}, {
    method: 'POST',
    path: 'login',
    options: {
        auth: false
    },
    handler: function (request, h) {

        return 'post account/login';
    }
}, {
    method: 'GET',
    path: 'signup',
    options: {
        auth: false
    },
    handler: function (request, h) {

        return 'get account/signup';
    }
}, {
    method: 'POST',
    path: 'signup',
    options: {
        auth: false
    },
    handler: function (request, h) {

        return 'post account/signup';
    }
}, {
    method: 'GET',
    path: 'logout',
    options: {
        auth: false
    },
    handler: function (request, h) {

        return 'get account/logout';
    }
}];
