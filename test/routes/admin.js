'use strict';

module.exports = [{
    method: 'GET',
    path: 'index',
    config: {
        auth: false
    },
    handler: function (request, reply) {

        reply('get admin/index');
    }
}, {
    method: 'GET',
    path: 'dashboard',
    config: {
        auth: false
    },
    handler: function (request, reply) {

        reply('get admin/dashboard');
    }
}];
