import Router from 'koa-router';
import { generateJWT, clearJWT, verifyRefreshJWT } from '../middware/auth';

const router = Router();

router.post('/login', generateJWT, (ctx, next) => {
  const req = ctx.request;
  const { userName } = req.body;

  const user = userList.find(item => item.name === userName);
  if (!user) {
    ctx.response.status = 401;
    return;
  }

  ctx.response.body = {
    userName: user.name,
    access_token: ctx.access_token,
    refresh_token: ctx.refresh_token,
  };
});

router.post('/refresh', verifyRefreshJWT, generateJWT, ctx => {
  ctx.response.body = {
    userName: ctx.user.userName,
    access_token: ctx.access_token,
    refresh_token: ctx.refresh_token,
  };
});

router.post('/loginOut', clearJWT);

const userList = [
  {
    name: 'Alice',
    sex: 'mail',
  },
  {
    name: 'Bob',
    sex: 'femail',
  },
];

export default router;
