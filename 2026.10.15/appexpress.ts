import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;


app.get('/', (req, res) => {
    res.type('text/plain; charset=utf-8').send('Strona główna');
});


app.get('/json', (req, res) => {
    res.json({ status: "ok", code: 200 });
});


app.get('/html', (req, res) => {
    res.type('text/html; charset=utf-8').send('<h1>HTML z kodu Express.js</h1>');
});

app.get('/file', (req, res) => {
    const filePath = path.join(__dirname, 'strona.html');
    res.type('text/html; charset=utf-8');
    fs.createReadStream(filePath).pipe(res);
});


app.get('/get_params', (req, res) => {
    const queryParams = req.query;

    console.log('Otrzymane parametry GET:', queryParams);

    const timestamp = Date.now();
    const fileName = `params_${timestamp}.json`;

    fs.writeFile(fileName, JSON.stringify(queryParams, null, 2), (err) => {
        if (err) {
            console.error('Błąd zapisu:', err);
        } else {
            console.log(`Zapisano do pliku: ${fileName}`);
        }
    });

    res.json({ ok: 'ok' });
});


app.use(express.static(path.join(__dirname, 'assets')));


app.use((req, res) => {
    res.status(404).json({ error: 'Not Found', code: 404 });
});

app.listen(PORT, () => {
    console.log(`Działa na: localhost:${PORT}`);
});
