'use strict';

const Path = require('path');
const FullPath = require('fullpath');
const Hoek = require('@hapi/hoek');
const Joi = require('@hapi/joi');

exports.plugin = {
    pkg: require('../package.json'),
    version: '0.3.0',
    attributes: {
        name: 'hapi-routes-loader'
    },
    register: (server, options) => {

        const schema = Joi.object({
            dirname: Joi.string().required().empty(),
            pathRoutes: Joi.string().required().empty()
        });

        const { error } = schema.validate(options);
        Hoek.assert(typeof error === 'undefined',error);
        const content = new FullPath.Search({
            'path': options.pathRoutes,
            'dirname': options.dirname
        });
        Hoek.assert(content.length !== 0, 'Any files for routes has been specified');
        const routes = [];

        content.map((filepath) => {

            const nameRoute = Path.basename(filepath,'.js');
            const route = require(filepath);

            routes.push(route.map((r) => {

                r.path = '/' + nameRoute + '/' + r.path;
                return r;
            }));
        });
        server.route(routes.flat());
    }
};
