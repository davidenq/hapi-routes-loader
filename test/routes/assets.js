'use strict';

const Path = require('path');

module.exports = [{
    method: 'GET',
    options: {
        auth: false
    },
    path: '{params*}',
    handler: {
        directory: {
            path: Path.join(__dirname, '../..', '/assets')
        }
    }
}];
