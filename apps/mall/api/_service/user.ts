interface User {
  username: string;
  password: string;
  email: string;
}

const userList: User[] = [{ username: '1', password: '1', email: '1' }];

async function create(props: {
  username: string;
  password: string;
  email: string;
}) {
  const { username, password, email } = props;

  if (!username || !password || !email) {
    return {
      code: 10001,
      msg: '信息有误',
      data: {},
    };
  }
  const user = userList.find(item => item.username === props.username);
  if (user) {
    throw new Error('用户名已存在');
  }

  userList.push(props);

  return props;
}

async function getOne(username: string): Promise<User | undefined> {
  const user = userList.find(item => item.username === username);
  return user;
}

export { getOne, create };
