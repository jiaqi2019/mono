import { create } from '@api/_service/user';

interface Data {
  username: string;
  password: string;
  email: string;
}

export const post = async (reqOption: { data: Data }) => {
  const {
    data: { username, password, email },
  } = reqOption;
  let msg = '';
  const user = await create({ username, email, password }).catch(
    (err: Error) => {
      msg = err.message;
    },
  );
  if (!user) {
    return {
      code: 10002,
      msg,
      data: {},
    };
  }
  return {
    code: 0,
    data: user,
    msg,
  };
};
