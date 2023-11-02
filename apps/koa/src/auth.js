import Koa from "koa";
import router from "./router/auth.js";
import koaBodyparser from "koa-bodyparser";

const app = new Koa();

app.use(koaBodyparser()).use(router.routes());

app.listen(4000);
