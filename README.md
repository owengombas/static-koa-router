# Serve static file through koa-router
[![Build Status](https://travis-ci.org/OwenCalvin/static-koa-router.svg?branch=master)](https://travis-ci.org/OwenCalvin/static-koa-router)

## Installation
```
npm i static-koa-router
```
```
yarn add static-koa-router
```

### Usage
`Serve(dirPath: string, router: Router, options?: Options)`
You simply need to pass the **dir path** at the first parameter, the **router instance** (koa-router) at the second parameter and optionaly the **options** at third parameter.

##### Options
 - `maxage` Browser cache max-age in milliseconds. defaults to 0
 - `hidden` Allow transfer of hidden files. defaults to false
 - `index` Default file name, defaults to 'index.html'
 - `defer` If true, serves after `return next()`, allowing any downstream middleware to respond first.
 - `gzip`  Try to serve the gzipped version of a file automatically when gzip is supported by a client and if the requested file with .gz extension exists. defaults to true.
 - `br`  Try to serve the brotli version of a file automatically when brotli is supported by a client and if the requested file with .br extension exists (note, that brotli is only accepted over https). defaults to true.
 - `extensions` Try to match extensions from passed array to search for file when no extension is sufficed in URL. First found is served. (defaults to `false`)
 - [setHeaders](https://github.com/koajs/send#setheaders) Function to set custom headers on response.

### Examples

##### Typescript
```javascript
import { Serve } from "static-koa-router";
import * as KoaRouter from "koa-router";
import * as Koa from "koa";
import * as Http from "http";

const app = new Koa();

const router = new KoaRouter({
  prefix: "/public"
});

Serve(`${__dirname}/public`, router);

app.use(router.routes());

const server = Http.createServer(app.callback());

server.listen(1337, "localhost", () => {
  console.log("Server started");
});
```

##### Javascript
```javascript
const StaticKoaRouter = require("static-koa-router");
const KoaRouter = require("koa-router");
const Koa = require("koa");
const Http = require("http");

const app = new Koa();

const router = new KoaRouter({
  prefix: "/public"
});

StaticKoaRouter.Serve(`${__dirname}/public`, router);

app.use(router.routes());

const server = Http.createServer(app.callback());

server.listen(1337, "localhost", () => {
  console.log("Server started");
});
```

### See also
[koa-static](https://github.com/koajs/static)  
[koa-send](https://github.com/koajs/send)  
[koa-router](https://github.com/ZijianHe/koa-router)

### License
MIT - Owen Calvin
