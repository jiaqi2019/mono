import { Context as KoaContext } from 'koa';

declare namespace ServerType {
  type Context = KoaContext;
}

export = ServerType;
export as namespace ServerType;
