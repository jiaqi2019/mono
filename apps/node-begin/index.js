import server from './server';
import router from './router';
import requesHandler from './reques-handler';

const handle = {
  '/': requesHandler.test,
  '/upload': requesHandler.upload,
  '/form': requesHandler.form,
  '/file_show': requesHandler.showFile,
  '/file_input': requesHandler.fileInput,
  '/file_parse': requesHandler.fileParse,
  '/start': requesHandler.start,
};

server.start(router.route, handle);
