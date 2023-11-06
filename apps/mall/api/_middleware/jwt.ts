import koaJwt from 'koa-jwt';
import { secret } from './config';

export const jwt = koaJwt({
  secret,
  cookie: 'token',
});
