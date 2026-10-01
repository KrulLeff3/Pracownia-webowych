const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        return res.end('Strona główna');
    }
    if (req.url === '/json') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ status: "ok", code: 200 }));
    }
    if (req.url === '/html') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end('<h1>HTML z kodu Node.js</h1>');
    }
    if (req.url === '/file') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        return fs.createReadStream('strona.html').pipe(res);
    }

    res.writeHead(404);
    res.end();
}).listen(3000, () => console.log('Serwer działa na http://localhost:3000'));
