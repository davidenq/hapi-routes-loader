[![Build Status](https://travis-ci.org/davidenq/hapi-routes-loader.svg?branch=master)](https://travis-ci.org/davidenq/hapi-routes-loader)
[![NPM](https://img.shields.io/npm/v/hapi-routes-loader.svg)](https://www.npmjs.com/package/hapi-routes-loader)
[![Downloads](https://img.shields.io/npm/dm/hapi-routes-loader.svg)](http://npm-stat.com/charts.html?package=hapi-routes-loader)
[![codecov](https://codecov.io/gh/davidenq/hapi-routes-loader/branch/master/graph/badge.svg)](https://codecov.io/gh/davidenq/hapi-routes-loader)


# hapi-routes-loader

*Coverage 100%*
A custom route loader for hapijs.

This module aims you write routes into separate files and load those without to require each file. Also, this module add a prefix with the file name in each declared path.

## Compatibility
| hapi-routes-loader version | hapi.js | node version |
| --- | --- | --- |
| `v0.3.0` | `>=18 @hapi/hapi` | `>=11` |
| `v0.2.0` | `=13 hapi` | `>=0.10` |


## Installation

```bash
$ [sudo] npm install hapi-routes-loader --save
```
## Usage

Following example attaches hapi-routes-loader to a simple node.js app (you can see test for more examples)

**_Directory structure:_**

```
├── example/
│   ├── public /
│   │   ├── assets/
│   │   │   │   ├── cs/
│   │   │   │   ├── js/
│   │   │   │   ├── img/
│   ├── app /
│   │   ├── routes/
│   │   │   ├── admin.js/
│   │   │   ├── user.js/
│   │   │   ├── account.js/
│   │   │   ├── assets.js/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── helpers/
.   .   .  . . . .
.   .   .  . . . .
.   .   .  . . . .
│   ├── server.js
```

`app/routes/user.js`
```js
'use strict';

module.exports = [{
    method: 'GET',
    path: 'index',
    config: {
        auth: false
    },
    handler: function (request, reply) {

        reply('get user/index');
    }
}, {
    method: 'GET',
    path: 'dashboard',
    config: {
        auth: false
    },
    handler: function (request, reply) {

        reply('get user/dashboard');
    }
}];

```

`app/routes/admin.js` //You can see more examples into test/routes folder
```js
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

```

`app/routes/account.js` //You can see more examples into test/routes folder
```js
'use strict';

module.exports = [{
    method: 'GET',
    path: 'index',
    config: {
        auth: false
    },
    handler: function (request, reply) {

        reply('get account/index');
    }
}, {
    method: 'GET',
    path: 'dashboard',
    config: {
        auth: false
    },
    handler: function (request, reply) {

        reply('get account/dashboard');
    }
}];

```

`server.js`
```js
'use strict';

const Hapi = require('hapi');
const Inert = require('inert');
const HapiRoutesLoader = require('hapi-routes-loader');

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    //register HapiRoutesLoader as a hapi's plugin
    await server.register([Inert,
        {
            plugin: HapiRoutesLoader,
            options: {
                dirname: __dirname,
                pathRoutes: '/routes'
            }
        }
    ]);
    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
```

## execute

```
node index.js
```


Open your browser and visit http://localhost:8000 and test your aplication with every registered routes in each file. For example:

http://localhost:8000/account/index
http://localhost:8000/account/dashboard

http://localhost:8000/admin/index
http://localhost:8000/admin/dashboard

http://localhost:8000/user/index
http://localhost:8000/user/dashboard


## Testing

```
npm run test
```

## Support

If you need help using hapi-routes-loader, or have found a bug, please create an issue on the
<a href='https://github.com/davidenq/hapi-routes-path/issues' target="_blank"> GitHub repo</a>.

## License

MIT Licence

