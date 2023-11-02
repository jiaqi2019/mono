function route(pathname, handle, response, request) {
  console.log(`handle ${pathname}`);
  const handler = handle[pathname];
  if (typeof handler === 'function') {
    return handler(response, request);
  }
  response.writeHead(200, {
    'Content-Type': 'text/plain',
  });
  response.write(`${pathname} no handler`);
  response.end();
}

export default {
  route,
};
