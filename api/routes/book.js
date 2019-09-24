const express = require('express');
const Book = require('../models/book');
const auth = require('../auth');

const bookRouter = new express.Router();

bookRouter.post('/', auth, async (req, res) => {
    try {
        const book = await Book.create(req.body)
        await book.save();
        res.status(201).send(book)
    } catch (e) {
        res.status(400).send(e)
    }
});

bookRouter.get('/:id', auth, async (req, res) => {
    const _id = req.params.id;
    try {
        const book = await Book.findById({_id});
        res.send(book)
    } catch (e) {
        res.status(500).send(e)
    }
});

bookRouter.get('/', auth, async (req, res) => {
    const match = {};
    const mySort = {};

    if (req.query.sortBy) {
        const sortArr = req.query.sortBy.split(':');
        mySort[sortArr[0]] = sortArr[1].match(/^(desc|descending|-1)$/) ? -1 : 1
    }

    if (req.query.isbn) {
        match.isbn = req.query.isbn
    }

    if (req.query.title) {
        match.title = req.query.title
    }

    if (req.query.author) {
        match.author = req.query.author
    }

    if (req.query.publisher) {
        match.publisher = req.query.publisher
    }

    try {
        const searchQuery = await Book.find(match).sort(mySort);
        res.send(searchQuery)
    } catch (e) {
        res.status(500).send(e)
    }
});


bookRouter.delete('/:id', auth, async (req, res) => {
    try {
        const book = await Book.findOneAndDelete({_id: req.params.id});
        if (!book) {
            return res.status(404).send()
        }
        res.send(book)
    } catch (e) {
        res.status(500).send(e)
    }
});

bookRouter.patch('/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['isbn', 'title', 'author', 'description', 'published_date', 'publisher'];
    const isValid = updates.every((update) => allowedUpdates.includes(update));
    if (!isValid) {
        return res.status(400).send({error: 'Invalid updates!'})
    }
    try {
        const book = await Book.findOne({_id: req.params.id});
        if (!book) {
            return res.status(404).send()
        }
        updates.forEach((update) => book[update] = req.body[update]);
        await book.save();
        res.send(book)
    } catch (e) {
        res.status(500).send(e)
    }
});

module.exports = bookRouter;