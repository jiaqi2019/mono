import { hook } from '@modern-js/runtime/server';
import { Context } from 'koa';
import { jwt } from './_middleware/jwt';

export default hook(({ addMiddleware }) => {
  addMiddleware(async (_ctx, next) => {
    _ctx.app.on('error', err => {
      console.log(err);
    });

    if (_ctx.request.url === '/api/user/info') {
      try {
        jwt(_ctx, () => {});
      } catch (e) {
        console.log(123);
        _ctx.status = 400;
        return;
      }
      try {
        await next();
      } catch (e) {}
    }
  });
  // addMiddleware(async (_ctx, next) => {
  //   await (next as () => Promise<any>)();
  //   const ctx = _ctx as unknown as Context;
  //   if (ctx.body.token) {
  //     ctx.cookies.set('token', ctx.body.token);
  //   }
  // });
});
