import { SendOptions } from "koa-send";
import { Without } from ".";

export interface IServeOptions extends Without<SendOptions, "root"> {
  defer?: boolean;
}
