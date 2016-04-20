[![Build Status](https://travis-ci.org/davidenq/hapi-routes-loader.svg?branch=master)](https://travis-ci.org/davidenq/hapi-routes-loader)
[![NPM](https://img.shields.io/npm/v/hapi-routes-loader.svg)](https://www.npmjs.com/package/hapi-routes-loader)
[![Downloads](https://img.shields.io/npm/dm/hapi-routes-loader.svg)](http://npm-stat.com/charts.html?package=hapi-routes-loader)

**_Coverage 98.53%_**

#English version

##hapi-routes-loader

A custom route loader for hapijs:

    a. for each connection with labels or,
    
    b. for a single connection.

This module moves the routing logic into separate files or a single file in the folder that you specify. This allowing you to separate routes in groups by functionality.  This module allows that your routes are automatically determined for you based on file-structure.

### Installation

```bash
$ [sudo] npm install hapi-routes-loader --save
```
### How to use

The following example attaches hapi-routes-loader to a simple  node.js app

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

`app/user.js //You can see how to write a route in each one files in the test/router folder`
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

**_Example for a single connection:_** 

`server.js`
```js
'use strict';

const Hapi = require('hapi');
const Inert = require('inert');
const HRL = require('hapi-routes-loader');

const server = new Hapi.Server();

server.connection({
    port: 8000
});

server.register([
    Inert,
    {
        register: HRL,
        options: {
            dirname: __dirname, //must be a string with a root path
            pathRoutes: '/app/routes'
        }
    }

], (err) => {

    server.start((err) => {
        console.log('Running web app at: ' + server.uri);
    });
});
```
### execute

```
node index.js
```

Open your browser and visit http://localhost:8000 and test your aplication with every route for example:

http://localhost:8000/account/login

http://localhost:8000/admin/index

http://localhost:8000/user/index


**_Example for each connection with labels:_** 

`server.js`
```js
'use strict';

const Hapi = require('hapi');
const Inert = require('inert');
const HRL = require('hapi-routes-loader');

const server = new Hapi.Server();

server.connection({
    port: 8000,
    labels: ['web']
});

server.connection({
    port: 8001,
    labels: ['admin']
});

server.register([
    Inert,
    {
        register: HRL,
        options: {
            dirname: __dirname, //must be a string with a root path
            pathRoutes: '/app/routes',
            groupBy: {
                //key must be the same name as a label server connection
                //value must be an array that containt the same name of each one  routes files.
                web: ['account', 'assets', 'user'],
                admin: ['admin']
            }
        }
    }

], (err) => {

    server.start((err) => {
        console.log('Running web app at: ' + server.select('web').info.uri);
        console.log('Running admin at: ' + server.select('admin').info.uri);
    });
});
```
### execute

```
node index.js
```
For web server connection open your browser and visit http://localhost:8000 and test your aplication with every route for example:

http://localhost:8000/account/login

http://localhost:8000/user/index

http://localhost:8000/user/dashboar

For admin server connection open your browser and visit http://localhost:8001 and test your aplication with every route for example:

http://localhost:8001/admin/index

http://localhost:8001/admin/dashboard

## Support

If you need help using hapi-routes-loader, or have found a bug, please create an issue on the
<a href='https://github.com/davidenq/hapi-routes-path/issues' target="_blank"> GitHub repo</a>.

## License

MIT Licence


#Versión español
 
 ##hapi-routes-loader
 
 Un cargador de rutas personalizable para hapijs:
 
   a. para cada conexión con etiquetas o,
   
   b. para una única conexión.
   
Este módulo mueve la lógica de enrutamiento en archivos separados o en un único archivo en la carpeta que especifique. Esto permite separar las rutas en grupos según la funcionalidad. Este módulo permite que las rutas se determinan automáticamente, basado en la estructura de archivos.

### Instalación

```bash
$ [sudo] npm install hapi-routes-loader --save
```
### ¿Cómo usar?

A continuación se muestra un ejemplo sencillo de la ejecución del módulo.

**_Estructura del directorio:_**

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

`app/user.js //Puede ver más ejemplos en el archivo test/router`
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

**_Ejemplo para una única conexión:_** 

`server.js`
```js
'use strict';

const Hapi = require('hapi');
const Inert = require('inert');
const HRL = require('hapi-routes-loader');

const server = new Hapi.Server();

server.connection({
    port: 8000
});

server.register([
    Inert,
    {
        register: HRL,
        options: {
            dirname: __dirname, //debe ser un string con la ruta del directorio raiz de su proyecto.
            pathRoutes: '/app/routes'
        }
    }

], (err) => {

    server.start((err) => {
        console.log('Running web app at: ' + server.uri);
    });
});
```
### ejecutar

```
node index.js
```

Abra su navegador y visite http://localhost:8000 y pruebe todas las rutas de su aplicación. Por ejemplo:

http://localhost:8000/account/login

http://localhost:8000/admin/index

http://localhost:8000/user/index


**_Ejemplo para cada con conexión con etiquetas:_** 

`server.js`
```js
'use strict';

const Hapi = require('hapi');
const Inert = require('inert');
const HRL = require('hapi-routes-loader');

const server = new Hapi.Server();

server.connection({
    port: 8000,
    labels: ['web']
});

server.connection({
    port: 8001,
    labels: ['admin']
});

server.register([
    Inert,
    {
        register: HRL,
        options: {
            dirname: __dirname, //debe ser un string con la ruta del directorio raiz de su proyecto.
            pathRoutes: '/app/routes',
            groupBy: {
                //key debe ser el mismo nombre de la etiqueta de una conexión del servidor.
                //value debe ser un array que contiene el nombre de cada uno de los archivos que desea agrupar en una conexión especifica.
                web: ['account', 'assets', 'user'],
                admin: ['admin']
            }
        }
    }

], (err) => {

    server.start((err) => {
        console.log('Running web app at: ' + server.select('web').info.uri);
        console.log('Running admin at: ' + server.select('admin').info.uri);
    });
});
```
### execute

```
node index.js
```
Para la conexión del servidor con etiqueta web, abra el navegador y visite http://localhost:8000 y pruebe su aplicación para cada ruta. Por ejemplo:

http://localhost:8000/account/login

http://localhost:8000/user/index

http://localhost:8000/user/dashboar

Para la conexión del servidor con etiqueta admin, abra el navegador y visite
http://localhost:8001 y prueba tu aplicación para cada ruta. Por ejemplo:

http://localhost:8001/admin/index

http://localhost:8001/admin/dashboard

## Soporte

Si necesitas ayuda usando  hapi-routes-loader, o si encuentras un bug, por favor crea un issue en
<a href='https://github.com/davidenq/hapi-routes-path/issues' target="_blank"> GitHub repo</a>.

## Licencia

MIT Licence

