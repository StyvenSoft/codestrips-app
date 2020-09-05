const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './db.sqlite');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));
app.use(morgan('dev'));
app.use(bodyParser.json());

app.get('/strips', (req, res, next) => {
    db.all('SELECT * FROM Strip', (err, rows) => {
        if (err) {
            res.sendStatus(500);
        } else {
            res.status(200).send({ strips: rows });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server in listen on http://localhost:${PORT}`);
})

module.exports = app;