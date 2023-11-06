import { secret } from '@api/_middleware/config';
import { getOne } from '@api/_service/user';
import { useContext } from '@modern-js/runtime/koa';
import jwt from 'jsonwebtoken';

interface Data {
  username: string;
  password: string;
}

export async function post(reqOption: { data: Data }) {
  const {
    data: { username, password },
  } = reqOption;
  const ctx = useContext();

  const user = await getOne(username).catch(() => undefined);

  if (!user) {
    return {
      code: 10002,
      msg: '用户名不存在',
      data: {},
    };
  }
  if (password !== user.password) {
    return {
      code: 0,
      msg: '密码不正确',
      data: {},
    };
  }
  const token = jwt.sign(user, secret, { expiresIn: '1d' });
  ctx.cookies.set('token', token);
  return {
    code: 0,
    data: user,
    token,
  };
}
