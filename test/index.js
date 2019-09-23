'use strict';

const _ = require('underscore');
const { expect } = require('@hapi/code');
const Lab = require('@hapi/lab');
const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const FullPath = require('fullpath');
const HapiRoutesLoader = require('../lib/index');

const { describe, it } = exports.lab = Lab.script();

describe('Throw errors for configurations', () => {

    it('it should throw an error when a plugin will be registered without any options', () => {

        const server = Hapi.Server();
        const outcome = server.register([{
            plugin: HapiRoutesLoader,
            options: {}
        }]);
        outcome.catch((e) => {

            expect(() => {

                throw new Error(e.message);
            }).to.throw('"dirname" is required');
        });
    });

    it('it should throw an error when a plugin will be registered with an empty value to dirname', () => {

        const server = Hapi.Server();
        const outcome = server.register([{
            plugin: HapiRoutesLoader,
            options: {
                dirname: ''
            }
        }]);
        outcome.catch((e) => {

            expect(() => {

                throw new Error(e.message);
            }).to.throw('"dirname" is not allowed to be empty');
        });
    });

    it('it should throw an error when a plugin will be registered only with dirname option', () => {

        const server = Hapi.Server();
        const outcome = server.register([{
            plugin: HapiRoutesLoader,
            options: {
                dirname: __dirname
            }
        }]);
        outcome.catch((e) => {

            expect(() => {

                throw new Error(e.message);
            }).to.throw('"pathRoutes" is required');
        });
    });

    it('it should throw an error when a plugin will be registered onlye with pathRoutes option', () => {

        const server = Hapi.Server();
        const outcome = server.register([{
            plugin: HapiRoutesLoader,
            options: {
                dirname: __dirname,
                pathRoutes: ''
            }
        }]);
        outcome.catch((e) => {

            expect(() => {

                throw new Error(e.message);
            }).to.throw('"pathRoutes" is not allowed to be empty');
        });
    });

    it('it should throw an error with message "must containt the path of each list object, the file name as part of the url"', () => {

        const init = async () => {

            const server = Hapi.server({
                port: 3000,
                host: 'localhost'
            });
            await server.register([Inert,
                {
                    plugin: HapiRoutesLoader,
                    options: {
                        dirname: __dirname,
                        pathRoutes: '/routes'
                    }
                }
            ]);
            const generateRoutes = [];
            const content = new FullPath.Search({
                'path': '/routes',
                'dirname': __dirname
            });

            content.map((filepath) => {

                const route = require(filepath);

                generateRoutes.push(route.map((r) => {

                    return {
                        method: r.method.toLowerCase(),
                        path: r.path
                    };
                }));
            });

            const routesFromServer = server.table().map((route) => {

                return {
                    method: route.method,
                    path: route.path
                };
            });
            expect(_.sortBy(routesFromServer, 'path')).to.equal(_.sortBy(generateRoutes.flat(), 'path'));
        };

        init();
    });

    it('it shoulw throw an error with message "Any files for routes has been specified"', () => {

        const server = Hapi.Server();
        const outcome = server.register([{
            plugin: HapiRoutesLoader,
            options: {
                dirname: __dirname,
                pathRoutes: '/empty'
            }
        }]);
        outcome.catch((e) => {

            expect(() => {

                throw new Error(e.message);
            }).to.throw('Any files for routes has been specified');
        });
    });
});
