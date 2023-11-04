import { hook } from '@modern-js/runtime/server';

export default hook(({ addMiddleware }) => {
  addMiddleware(async (ctx, next) => {
      next();
  });
});
