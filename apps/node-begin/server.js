import http from 'http'
import url from 'url';



function start(route, routHandle){
    http.createServer(function (req, res){
        const pathname = url.parse(req.url).pathname;
        route(pathname, routHandle, res, req)
    }
    ).listen(8080);
    console.log("server has started");
}


export default {
    start
}