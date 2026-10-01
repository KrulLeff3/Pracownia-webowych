const http = require('http');
const fs = require('fs');
const { URL } = require('url');

http.createServer((req, res) => {
    const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost:3000'}`);
    const pathname = parsedUrl.pathname;

    if (pathname === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        return res.end('Strona główna');
    }
    if (pathname === '/json') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ status: "ok", code: 200 }));
    }
    if (pathname === '/html') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end('<h1>HTML z kodu Node.js</h1>');
    }
    if (pathname === '/file') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        return fs.createReadStream('strona.html').pipe(res);
    }
    
    if (pathname === '/get_params') {
        const queryParams = Object.fromEntries(parsedUrl.searchParams.entries());

        console.log('Otrzymane parametry GET:', queryParams);

        const timestamp = Date.now();
        const fileName = `params_${timestamp}.json`;

        fs.writeFile(fileName, JSON.stringify(queryParams, null, 2), (err) => {
            if (err) {
                console.error('Błąd zapisu:', err);
            } else {
                console.log(`Zapisano dane do pliku: ${fileName}`);
            }
        });

        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ ok: 'ok' }));
    }

    res.writeHead(404);
    res.end();
}).listen(3000, () => console.log('działa'));
