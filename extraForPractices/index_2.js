const http = require('http');
const url = require('url');
const { StringDecoder } = require('string_decoder');

const app = {};

app.config = {
    port: 4400,
};

app.createServer = () => {
    const server = http.createServer(app.handleRequest);
    server.listen(app.config.port, () => {
        console.log(`listening port to ${app.config.port}`);
    });
};

app.handleRequest = (req, res) => {
    const parseUrl = url.parse(req.url, true);
    const pathName = parseUrl.pathname;
    const trimPathName = pathName.replace(/^\/+|\/+$/g, '');
    const method = req.method.toLowerCase();
    const queryStringObject = parseUrl.query;
    const headerObject = req.headers;
    // console.log(headerObject);

    const decoder = new StringDecoder('utf-8');
    let realData = '';

    req.on('data', (buffer) => {
        realData += decoder.write(buffer);
    });

    req.on('end', () => {
        realData += decoder.end();
        console.log(realData);
        res.end('Hi programmers');
    });
};

app.createServer();
