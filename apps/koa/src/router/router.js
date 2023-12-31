import KoaRouter from 'koa-router';
import jwt from 'koa-jwt';
import { verifyJWT } from '../middware/auth.js';
import 'dotenv/config';

const verifyJwt = jwt({
  secret: process.env.ACCESS_TOKEN,
});

const router = KoaRouter({
  exclusive: true,
});

router.get('/', (ctx, next) => {
  ctx.res.write('000');
  next();
});

router.get('/', (ctx, next) => {
  ctx.response.status = 200;
  ctx.response.body = '12365';
});

router.get(
  '/index',
  (ctx, next) => {
    ctx.res.write('index 1');
    console.log(1);
    next();
    console.log(2);
  },
  (ctx, next) => {
    ctx.res.write('index 2');
    ctx.res.end();
    next();
    console.log(next);
    console.log(3);
  },
);

router.get(['/arr', /arr$/, ['/yyy', /zzz$/]], (ctx, next) => {
  ctx.res.write('arr');
  ctx.res.end();
});

router.get(/reg$/, (ctx, next) => {
  ctx.res.write('reg');
  ctx.res.end();
});

router.post('/submit', verifyJwt, (ctx, next) => {
  const { user, state } = ctx;
  if (!user && !state.user) {
    return (ctx.response.status = 401);
  }
  ctx.response.body = user;
});

export default router;
