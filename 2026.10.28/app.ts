import express from 'express';
import mysql from 'mysql2';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pracownia'
});

db.connect((err) => {
    if (err) {
        console.error('Błąd połączenia z bazą:', err);
    } else {
        console.log('Połączono z bazą MySQL');
    }
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.post('/api/contact-messages', (req, res) => {
    const imie = req.body.imie;
    const nazwisko = req.body.nazwisko;
    const email = req.body.email;
    const tekst = req.body.tekst;

    console.log('Otrzymana wiadomość:', req.body);

    const sql = 'INSERT INTO messages (imie, nazwisko, email, tekst) VALUES (?, ?, ?, ?)';

    db.query(sql, [imie, nazwisko, email, tekst], (err, result) => {
        if (err) {
            console.error('Błąd zapisu:', err);
            return res.status(500).json({ error: 'Database error', code: 500 });
        }

        console.log('Zapisano wiadomość, id:', result.insertId);
        res.redirect('/index.html');
    });
});


app.get('/api/contact-messages', (req, res) => {
    db.query('SELECT * FROM messages', (err, rows) => {
        if (err) {
            console.error('Błąd odczytu:', err);
            return res.status(500).json({ error: 'Database error', code: 500 });
        }

        res.json(rows);
    });
});


app.get('/api/contact-messages/:id', (req, res) => {
    const id = req.params.id;

    db.query('SELECT * FROM messages WHERE id = ?', [id], (err, rows) => {
        if (err) {
            console.error('Błąd odczytu:', err);
            return res.status(500).json({ error: 'Database error', code: 500 });
        }

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Not Found', code: 404 });
        }

        res.json(rows[0]);
    });
});


app.get(['/app.ts', '/static/app.ts'], (req, res) => {
    res.status(404).json({ error: 'Not Found', code: 404 });
});

app.use(express.static(__dirname));
app.use('/static', express.static(__dirname));


app.use((req, res) => {
    res.status(404).json({ error: 'Not Found', code: 404 });
});

app.listen(PORT, () => {
    console.log(`Dziala na: localhost:${PORT}`);
});
