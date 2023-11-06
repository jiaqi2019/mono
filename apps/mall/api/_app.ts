import { hook } from '@modern-js/runtime/server';
import { Context, Next } from 'koa';
import { verifyJWT } from './_middleware/jwt';

export default hook(({ addMiddleware }) => {
  addMiddleware(async (ctx, next) => {
    if (ctx.request.url === '/api/user/info') {
      verifyJWT(ctx as unknown as Context, next as unknown as Next);
    } else {
      await (next as unknown as () => Promise<void>)();
    }
  });
});
