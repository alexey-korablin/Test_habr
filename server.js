import { Mongoose } from 'mongoose';

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const port = 8081;
let book = require('./app/routes/book');
let config = require('config');

let options = {
    server: { socketOptions: { keepAlive: 1, connectTimeotMS: 30000 } },
    replset: { socketOptions: { keepAlive: 1, connectTimeotMS: 30000 } }
};

mongoose.connect(config.DBHost, options);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

if (config.util.getEnv('NODE_ENV') !== 'test') {
    app.use(morgan('combined'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: 'application/json'}));

app.get('/', (req, res) => res.json({message: 'Welcome to our Bookstore!'}));

app.route('/book')
    .get(book.getBooks)
    .post(book.postBook);
app.route('/book/:id')
    .get(book.getBook)
    .delete(book.deleteBook)
    .put(book.updateBook);

app.listen(port);

console.log('Listening on teh port' + port);

module.exports = app;