import Koa from 'koa';
import koaBodyparser from 'koa-bodyparser';
import router from './router/auth';

const app = new Koa();

app.use(koaBodyparser()).use(router.routes());

app.listen(4000);
