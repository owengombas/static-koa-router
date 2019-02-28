# Serve static file with koa-router
[![Build Status](https://travis-ci.org/OwenCalvin/koa-router-static.svg?branch=master)](https://travis-ci.org/OwenCalvin/koa-router-static)

## Installation
```
npm i static-koa-router
```
```
yarn add static-koa-router
```

### Usage
`Serve(dirPath: string, router: Router, options?: Options)`
You simply need to pass the **dir path** at first parameter, the **router instance** (koa-router) at the second parameter and optionaly the **options**.

##### Options
 - `maxage` Browser cache max-age in milliseconds. defaults to 0
 - `hidden` Allow transfer of hidden files. defaults to false
 - `index` Default file name, defaults to 'index.html'
 - `defer` If true, serves after `return next()`, allowing any downstream middleware to respond first.
 - `gzip`  Try to serve the gzipped version of a file automatically when gzip is supported by a client and if the requested file with .gz extension exists. defaults to true.
 - `br`  Try to serve the brotli version of a file automatically when brotli is supported by a client and if the requested file with .br extension exists (note, that brotli is only accepted over https). defaults to true.
 - `extensions` Try to match extensions from passed array to search for file when no extension is sufficed in URL. First found is served. (defaults to `false`)
 - [setHeaders](https://github.com/koajs/send#setheaders) Function to set custom headers on response.

### Example
##### Typescript
```javascript
import * as KoaRouter from "koa-router";
import * as Http from "http";
import * as Koa from "koa";
import { Serve } from "static-koa-router";

const app = new Koa();

const router = new KoaRouter({
  prefix: "/router"
});

Serve(`${__dirname}/public`, router);

app.use(router.routes());

const server = Http.createServer(app.callback());
server.listen(1337, "localhost", () => {
  console.log("Server started");
});

```

### See also
[koa-static](https://github.com/koajs/static)

### License
MIT
