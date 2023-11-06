import { useContext } from '@modern-js/runtime/koa';

export const get = async () => {
  const ctx = useContext();
  if (!ctx.user) {
    return {
      code: 10002,
      msg: '重新登陆',
    };
  }
  return {
    code: 0,
    data: ctx.user,
  };
};
