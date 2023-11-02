import http from 'http';
import url from 'url';

function start(route, routHandle) {
  http
    .createServer(function (req, res) {
      const { pathname } = url.URL.parse(req.url);
      route(pathname, routHandle, res, req);
    })
    .listen(8080);
  console.log('server has started');
}

export default {
  start,
};
