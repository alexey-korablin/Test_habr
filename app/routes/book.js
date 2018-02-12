const mongoose = require('mongoose');
const Book = require('../models/book');

function getBooks(req, res) {
    let query = Book.find({});
    query.exec((err, books) => {
        if (err) {
            res.send(err);
        }
        res.json(books);
    })
}

function postBook(req, res) {
    let newBook = new Book(req.body);
    newBook.save((err, book) => {
        if (err) {
            res.send(err);
        } else {
            res.json({message: 'Book successfully added'});
        }
    })
}

function getBook(req, res) {
    Book.findById(req.params.id, (err, book) => {
        if (err) {
            res.send(err);
        }
        res.json(book);
    })
}

function deleteBook(req, res) {
    Book.remove({_id: req.params.id}, (err, result) => {
        res.json({message: 'Book deleted successfully'})
    })
}

function updateBook(req, res) {
    Book.findById({_id: req.params.id}, (err, boook) => {
        if (err) {
            res.send(err);
        }
        Object.assign(book, req.book).save((err, book) => {
            if (err) {
                res.send(err);
            }
            res.json({message: 'Book updated', book})
        })
    })
}

module.exports = {getBooks, getBook, postBook, updateBook, deleteBook};