import childProcess from 'child_process';
import querystring from 'querystring';
import fs from 'fs';
import formidable from 'formidable';

async function testAsyc() {
  return new Promise(resolve => {
    setTimeout(resolve, 5000);
  });
}

async function test(response) {
  await testAsyc();
  response.writeHead(200, {
    'Content-Type': 'text/plain',
  });
  response.write('test');
  response.end();
}

function start(response, request) {
  // while(Date.now() < now);
  let content = 'empty';
  childProcess.exec(
    'find /',
    { timeout: 10000, maxBuffer: 20000 * 1024 },
    (error, stdout, stderr) => {
      content = stdout;
      response.writeHead(200, {
        'Content-Type': 'text/plain',
      });
      response.write(content);
      response.end();
    },
  );
  return content;
}

function upload(response, request) {
  let postData = '';
  request.setEncoding('utf8');
  request.addListener('data', chunk => {
    postData += chunk;
  });
  request.addListener('end', () => {
    response.writeHead(200, {
      'Content-Type': 'text/plain',
    });
    response.write(querystring.parse(postData).text);
    response.end();
  });
}

function form(response, request) {
  const body =
    '<html>' +
    '<head>' +
    '<meta http-equiv="Content-Type" content="text/html; ' +
    'charset=UTF-8" />' +
    '</head>' +
    '<body>' +
    '<form action="/upload" method="post">' +
    '<textarea name="text" rows="20" cols="60"></textarea>' +
    '<input type="submit" value="Submit text" />' +
    '</form>' +
    '</body>' +
    '</html>';
  response.writeHead(200, {
    'Content-Type': 'text/html',
  });
  response.write(body);
  response.end();
}

function fileInput(response, request) {
  const body =
    '<html>' +
    '<head>' +
    '<meta http-equiv="Content-Type" content="text/html; ' +
    'charset=UTF-8" />' +
    '</head>' +
    '<body>' +
    '<form action="/file_parse?test=xx" enctype="multipart/form-data" ' +
    'method="post">' +
    '<input type="file" name="upload" multiple="multiple">' +
    '<input type="submit" value="Upload file" />' +
    '</form>' +
    '</body>' +
    '</html>';
  response.writeHead(200, {
    'Content-Type': 'text/html',
  });
  response.write(body);
  response.end();
}

function fileParse(response, request) {
  const form = formidable({});
  form.parse(request, (err, fields, files) => {
    fs.renameSync(files.upload[0].filepath, '/tmp/test.png');
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write('received image:<br/>');
    response.write("<img src='/file_show' />");
    response.end();
  });
}

function showFile(response, request) {
  console.log("Request handler 'show' was called.");
  fs.readFile('/tmp/test.png', 'binary', function (error, file) {
    if (error) {
      response.writeHead(500, { 'Content-Type': 'text/plain' });
      response.write(`${error}\n`);
      response.end();
    } else {
      response.writeHead(200, { 'Content-Type': 'image/png' });
      response.write(file, 'binary');
      response.end();
    }
  });
}

export default {
  start,
  upload,
  form,
  fileInput,
  showFile,
  fileParse,
  test,
};
