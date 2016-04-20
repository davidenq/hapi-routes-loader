'use strict';

module.exports = [{
    method: 'GET',
    path: 'login',
    config: {
        auth: false
    },
    handler: function (request, reply) {

        reply('get account/login');
    }
}, {
    method: 'POST',
    path: 'login',
    config: {
        auth: false
    },
    handler: function (request, reply) {

        reply('post account/login');
    }
}, {
    method: 'GET',
    path: 'signup',
    config: {
        auth: false
    },
    handler: function (request, reply) {

        reply('get account/signup');
    }
}, {
    method: 'POST',
    path: 'signup',
    config: {
        auth: false
    },
    handler: function (request, reply) {

        reply('post account/signup');
    }
}, {
    method: 'GET',
    path: 'logout',
    config: {
        auth: false
    },
    handler: function (request, reply) {

        reply('get account/logout');
    }
}];
