const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// GET all books
const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDatabase().db().collection('books').find();
    result.toArray().then((books) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(books);
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch books', details: err });
  }
};

// GET single book by ID
const getSingle = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('books').find({ _id: userId });
    result.toArray().then((books) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(books[0]);
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch the book', details: err });
  }
};

module.exports = {
  getAll,
  getSingle
};
