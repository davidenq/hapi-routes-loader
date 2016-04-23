'use strict';

const _ = require('underscore');
const Code = require('code');
const Lab = require('lab');
const Hapi = require('hapi');
const Inert = require('inert');
const Path = require('path');
const FullPath = require('fullpath');

const lab = exports.lab = Lab.script();
const describe = lab.experiment;
const expect = Code.expect;
const it = lab.test;

describe('Test module: ', () => {

    describe('Throw errors for configurations: ', () => {

        it('throw error with message "The options must contain name/value pair with name equal to dirname" ', (done) => {

            expect(() => {

                const server = new Hapi.Server();
                server.connection();
                server.initialize((err) => {

                    if (err) {
                        throw err;
                    }
                });
                server.register([{
                    register: require('../lib/index'),
                    options: {
                    }
                }], (err) => {

                    throw err;
                });
                server.stop();
            }).to.throw('The options must contain name/value pair with name equal to dirname');

            done();
        });

        it('throw error with message "The options must contain name/value pair with name equal to pathRoutes" ', (done) => {

            expect(() => {

                const server = new Hapi.Server();
                server.connection();
                server.initialize((err) => {

                    if (err) {
                        throw err;
                    }
                });
                server.register([{
                    register: require('../lib/index'),
                    options: {
                        dirname: __dirname
                    }
                }], (err) => {

                    throw err;
                });
                server.stop();
            }).to.throw('The options must contain name/value pair with name equal to pathRoutes');

            done();
        });

        it('throw error with message "The dirname must be a string with a root path of the server" ', (done) => {

            expect(() => {

                const server = new Hapi.Server();
                server.connection();
                server.initialize((err) => {

                    if (err) {
                        throw err;
                    }
                });
                server.register([{
                    register: require('../lib/index'),
                    options: {
                        dirname: null,
                        pathRoutes: '/routes'
                    }
                }], (err) => {

                    throw err;
                });
                server.stop();
            }).to.throw('The dirname must be a string with a root path of the server');

            done();
        });

        it('throw error with message "The pathRoutes must be a string with a path of the routes"', (done) => {

            expect(() => {

                const server = new Hapi.Server();
                server.connection();
                server.initialize((err) => {

                    if (err) {
                        throw err;
                    }
                });
                server.register([{
                    register: require('../lib/index'),
                    options: {
                        dirname: __dirname,
                        pathRoutes: null
                    }
                }], (err) => {

                    throw err;
                });
                server.stop();
            }).to.throw('The pathRoutes must be a string with a path of the routes');

            done();
        });

        it('throw error with message "The groupBy must be a object with configuration parameters"', (done) => {

            expect(() => {

                const server = new Hapi.Server();
                server.connection();
                server.initialize((err) => {

                    if (err) {
                        throw err;
                    }
                });
                server.register([{
                    register: require('../lib/index'),
                    options: {
                        dirname: __dirname,
                        pathRoutes: '/routes',
                        groupBy: {}
                    }
                }], (err) => {

                    throw err;
                });
                server.stop();
            }).to.throw('The groupBy must be a object with configuration parameters');

            done();
        });

        it('throw error with message "The name in groupBy object must be the same name as a label server connection."', (done) => {

            expect(() => {

                const server = new Hapi.Server();

                server.connection({
                    port: 8000,
                    labels: ['web']
                });

                server.connection({
                    port: 8001,
                    labels: ['admin']
                });

                server.initialize((err) => {

                    if (err) {
                        throw err;
                    }
                });

                server.register([{
                    register: require('../lib/index'),
                    options: {
                        dirname: __dirname,
                        pathRoutes: '/routes',
                        groupBy: {
                            webs: [],
                            admins: []
                        }
                    }
                }], (err) => {

                    throw err;
                });
                server.stop();
            }).to.throw('The name in groupBy object must be the same name as a label server connection.');

            done();
        });

        it('throw error with message "The array must be non-empty. You must specify in the array the same name of each one  routes files."', (done) => {

            expect(() => {

                const server = new Hapi.Server();
                server.connection({
                    port: 8000,
                    labels: ['web']
                });

                server.connection({
                    port: 8001,
                    labels: ['admin']
                });
                server.initialize((err) => {

                    if (err) {
                        throw err;
                    }
                });
                server.register([{
                    register: require('../lib/index'),
                    options: {
                        dirname: __dirname,
                        pathRoutes: '/routes',
                        groupBy: {
                            web: [],
                            admin: []
                        }
                    }
                }], (err) => {

                    throw err;
                });

                server.stop();
            }).to.throw('The array must be non-empty. You must specify in the array the same name of each one  routes files.');

            done();
        });

        it('throw error with message "There are not routes files."', (done) => {

            expect(() => {

                const server = new Hapi.Server();
                server.connection();
                server.initialize((err) => {

                    if (err) {
                        throw err;
                    }
                });
                server.register([{
                    register: require('../lib/index'),
                    options: {
                        dirname: __dirname,
                        pathRoutes: '/empty'
                    }
                }], (err) => {

                    if (err) {
                        throw err;
                    }
                });
                server.stop();
            }).to.throw('There are not routes files.');

            done();

        });
    });

    describe('A single server connection: ', () => {

        it('throw error with message "must containt the path of each list object, the file name as part of the url"', (done) => {

            const server = new Hapi.Server();
            server.connection();
            server.initialize((err) => {

                if (err) {
                    throw err;
                }
            });
            server.register([Inert, {
                register: require('../lib/index'),
                options: {
                    dirname: __dirname,
                    pathRoutes: '/routes'
                }
            }], (err) => {

                if (!err) {

                    const routes = [];
                    const filename = [];
                    const content = new FullPath.Search({
                        'path': '/routes',
                        'dirname': __dirname
                    });

                    for ( const i in content ) {

                        if (~content[i].indexOf('.js') && content[i]) {
                            filename.push(Path.basename(content[i], '.js'));
                        }
                    }

                    const table = server.table();

                    for (const key in table) {
                        for (const path in table[key].table) {
                            routes.push(table[key].table[path].path.split('/')[1]);
                        }
                    }

                    const routesName = _.uniq(routes).sort();

                    expect(filename).to.deep.equal(routesName);
                }
            });
            server.stop();
            done();
        });

        describe('When is used require to include modules', () => {

            it('thow new error when is used require to include modules and this containt errors.', (done) => {

                const server = new Hapi.Server();
                server.connection();
                server.initialize((err) => {

                    if (err) {
                        throw err;
                    }
                });
                expect(() => {

                    server.register([
                        Inert, {
                            register: require('../lib/index'),
                            options: {
                                dirname: __dirname,
                                pathRoutes: '/routes'
                            }
                        }], (err) => {

                        if (err) {

                            throw err;
                        }
                    });
                }).to.throw();
                server.stop();
                done();
            });
        });

    });

    describe('Multiples server connections: ', () => {

        it('You must specify in the array the same name of each one  routes files.', (done) => {

            const server = new Hapi.Server();
            server.connection({
                port: 8000,
                labels: ['webServer']
            });

            server.connection({
                port: 8001,
                labels: ['adminServer']
            });
            server.initialize((err) => {

                if (err) {
                    throw err;
                }
            });
            expect(() => {

                server.register([Inert, {
                    register: require('../lib/index'),
                    options: {
                        dirname: __dirname,
                        pathRoutes: '/routes',
                        groupBy: {
                            webServer: ['badName', 'assets', 'user'],
                            adminServer: ['badName']
                        }
                    }
                }], (err) => {

                    if (!err) {
                        throw err;
                    }

                });
                server.stop();
            }).to.throw('You must specify in the array the same name of each one  routes files.');

            done();
        });

        describe('When is used require to include modules', () => {

            it('thow new error when is used require to include modules and this containt errors.', (done) => {

                const server = new Hapi.Server();
                server.connection({
                    port: 8000,
                    labels: ['webServer']
                });

                server.connection({
                    port: 8001,
                    labels: ['adminServer']
                });
                server.initialize((err) => {

                    if (err) {
                        throw err;
                    }
                });
                expect(() => {

                    server.register([
                        Inert, {
                            register: require('../lib/index'),
                            options: {
                                dirname: __dirname,
                                pathRoutes: '/routes',
                                groupBy: {
                                    webServer: ['account', 'assets', 'user'],
                                    adminServer: ['admin']
                                }
                            }
                        }], (err) => {

                        if (err) {

                            throw err;
                        }
                    });
                }).to.throw();
                server.stop();
                done();
            });
        });
    });
});
