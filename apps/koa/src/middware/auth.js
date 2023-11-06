import jwt from 'jsonwebtoken';
import 'dotenv/config';

let refreshTokenList = [];

export const generateJWT = (ctx, next) => {
  const userName = ctx.request.body.userName || ctx.user.userName;
  const token = jwt.sign(
    {
      userName,
    },
    process.env.ACCESS_TOKEN,
    {
      expiresIn: '1d',
      audience: 'aud',
      issuer: 'iss',
      subject: 'sub',
      jwtid: 'jti',
    },
  );
  const refreshToken = jwt.sign(
    {
      userName,
    },
    process.env.ACCESS_REFRESH_TOKEN,
  );
  refreshTokenList.push(refreshToken);

  ctx.access_token = token;
  ctx.refresh_token = refreshToken;
  next();
};

export const verifyJWT = (ctx, next) => {
  const accessToken = ctx.request.header.authorization?.split(' ')[1];

  if (!accessToken) {
    return (ctx.response.status = 401);
  }
  jwt.verify(accessToken, process.env.ACCESS_TOKEN, (error, user) => {
    if (error) {
      return (ctx.response.status = 401);
    }
    console.log(user);
    ctx.user = user;
    next();
  });
};

export const verifyRefreshJWT = (ctx, next) => {
  const req = ctx.request;
  const { refreshToken } = req.body;

  if (!refreshToken || !refreshTokenList.find(item => item === refreshToken)) {
    return (ctx.response.status = 401);
  }
  jwt.verify(refreshToken, process.env.ACCESS_REFRESH_TOKEN, (error, user) => {
    if (error) {
      return (ctx.response.status = 401);
    }
    console.log(user);
    ctx.user = user;
    next();
  });
};

export const clearJWT = (ctx, next) => {
  refreshTokenList = refreshTokenList.filter(
    item => item !== ctx.request.body.refreshToken,
  );
  ctx.response.status = 204;
  next();
};
