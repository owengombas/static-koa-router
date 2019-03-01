import * as KoaRouter from "koa-router";
import * as Send from "koa-send";
import * as Path from "path";
import { IServeOptions, Router, Without } from "./types";
import { Context, Middleware } from "koa";

function getCtxPath(koaRouter: KoaRouter, ctx: Context) {
  const router = koaRouter as Router;
  const routerPrefix = router.opts.prefix;
  const path = ctx.path.replace(routerPrefix, "");
  return path || "/";
}

export function Serve(dirPath: string, router: KoaRouter);
export function Serve(dirPath: string, router: KoaRouter, options: IServeOptions);
export function Serve(dirPath: string, router: KoaRouter, options?: IServeOptions) {
  const resolvedPath = Path.resolve(dirPath);
  const definedOptions = options || {};
  const sendOptions: Send.SendOptions = {
    ...(definedOptions as Without<IServeOptions, "defer">),
    index: definedOptions.index || "index.html",
    root: resolvedPath
  };
  let middleware: Middleware;

  if (!definedOptions.defer) {
    middleware = async (ctx: Context, next) => {
      let done: string;

      if (ctx.method === "HEAD" || ctx.method === "GET") {
        try {
          done = await Send(ctx, getCtxPath(router, ctx), sendOptions);
        } catch (err) {
          if (err.status !== 404) {
            throw err;
          }
        }
      }

      if (!done) {
        await next();
      }
    };
  } else {
    middleware = async (ctx: Context, next) => {
      await next();

      if (ctx.method !== "HEAD" && ctx.method !== "GET") {
        return;
      }
      // response is already handled
      if (ctx.body != null || ctx.status !== 404) {
        return;
      }

      try {
        await Send(ctx, ctx.path, sendOptions);
      } catch (err) {
        if (err.status !== 404) {
          throw err;
        }
      }
    };
  }

  return router.head("*", middleware).get("*", middleware);
}
