import { Context, Next } from 'koa';
import jwt from 'jsonwebtoken';
import { secret } from './config';

export const verifyJWT = async (ctx: Context, next: Next) => {
  const accessToken = ctx.cookies.get('token');
  if (!accessToken) {
    return await next();
  }
  jwt.verify(accessToken, secret, async (error, user) => {
    if (user) {
      ctx.user = user;
    }
    await next();
  });
};
