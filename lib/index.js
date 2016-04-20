'use strict';

const Path = require('path');
const FullPath = require('fullpath');
const Hoek = require('hoek');

exports.register = function (server, options, next) {

    let nameRoute = null;
    let extName = null;
    const routes = [];
    const flattenRoutes = [];
    let content = [];
    let temp = [];

    if (options.groupBy !== undefined) {

        Hoek.assert(typeof options.groupBy === 'object', 'The groupBy must be a object with configuration parameters');
        Hoek.assert(Object.keys(options.groupBy).length !== 0, 'The groupBy must be a object with configuration parameters');

        for (const key in options.groupBy) {

            Hoek.assert(server.select(key).info !== null, 'The name in groupBy object must be the same name as a label server connection.');
            Hoek.assert(options.groupBy[key].length !== 0, 'The array must be non-empty. You must specify in the array the same name of each one  routes files.');
        }
    }

    Hoek.assert(options.dirname !== undefined, 'The options must contain name/value pair with name equal to dirname');
    Hoek.assert(options.pathRoutes !== undefined, 'The options must contain name/value pair with name equal to pathRoutes');
    Hoek.assert(typeof options.dirname === 'string', 'The dirname must be a string with a root path of the server');
    Hoek.assert(typeof options.pathRoutes === 'string', 'The pathRoutes must be a string with a path of the routes');

    content = new FullPath.Search({
        'path': options.pathRoutes,
        'dirname': options.dirname
    });

    if (content.length > 0) {

        content.forEach( (file) => {

            extName = Path.extname(Path.basename(file));
            nameRoute = Path.basename(file, extName);
            routes[nameRoute] = require(file);

        });

    }

    for (const key in routes) {
        for (const value in routes[key]) {

            routes[key][value].path = '/' + [key] + '/' + routes[key][value].path;

            if (options.groupBy === undefined) {

                //A flatten array that containt all routes when is not defined groupBY
                flattenRoutes.push(routes[key][value]);

            }
        }
    }


    if ( options.groupBy !== undefined) {
        for (const key in options.groupBy){
            for (const value in options.groupBy[key]) {

                temp.push(routes[options.groupBy[key][value]]);
            }
            flattenRoutes[key] = Hoek.flatten(temp);
            temp = [];
        }

        for (const key in flattenRoutes) {
            try {
                server.select(key).route(flattenRoutes[key]);
            }
            catch (e) {

                throw new Error('You must specify in the array the same name of each one  routes files.');
            }
        }

    }
    else {
        server.route(flattenRoutes);
    }

    next();
};

exports.register.attributes = {
    pkg: require('../package.json')
};
