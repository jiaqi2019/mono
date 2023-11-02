
import server from './server.js';
import router from './router.js';
import requesHandler from './reques-handler.js';

const handle = {
    '/' : requesHandler.test,
    '/upload' : requesHandler.upload,
    '/form' : requesHandler.form,
    '/file_show': requesHandler.showFile,
    '/file_input': requesHandler.fileInput,
    '/file_parse': requesHandler.fileParse,
    '/start': requesHandler.start


}   

server.start(router.route, handle);












