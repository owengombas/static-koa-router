import * as KoaRouter from "koa-router";
import * as Http from "http";
import * as Koa from "koa";
import { Serve } from "../../src/Serve";

export async function Start() {
  return new Promise((resolve) => {
    const app = new Koa();

    const router = new KoaRouter({
      prefix: "/public"
    });

    Serve(`${__dirname}/public`, router);

    app.use(router.routes());

    const server = Http.createServer(app.callback());
    server.listen(1337, "localhost", () => {
      console.log("Server started");
      resolve();
    });
  });
}
