import Koa from 'koa';
import koaBodyparser from 'koa-bodyparser';
import router from './router/router.js';
import 'dotenv/config';

const app = new Koa();

app.use(koaBodyparser()).use(router.routes());

app.listen(3000, () => {
  console.log('listen 3000 xxx');
});
