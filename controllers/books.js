const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

//#swagger.tags=['books']
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
  //#swagger.tags=['books']
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

const createUser = async (req, res) => {
  //#swagger.tags=['books']
  const user = {
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    publishedDate: req.body.publishedDate,
    price: req.body.price,
    inStock: req.body.inStock,
    rating: req.body.rating
  };
  const response = await mongodb.getDatabase().db().collection('books').insertOne(user);
  if (response.acknowleged) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || ' some error occurred while updating the user');
  }
};

const updateUser = async (req, res) => {
  //#swagger.tags=['books']
  const userId = new ObjectId(req.params.id);
  const user = {
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    publishedDate: req.body.publishedDate,
    price: req.body.price,
    inStock: req.body.inStock,
    rating: req.body.rating,
    ipaddress: req.body.ipaddress
};
  const response = await mongodb.getDatabase().db().collection('books').replaceOne({_id: userId}, user);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || ' some error occurred while updating the user');
  }

};

const deleteUser = async (req, res) => {
  //#swagger.tags=['books']
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDatabase().db().collection('books').deleteOne({ _id: userId },true);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || ' some error occurred while deleting the user');
  }

};

module.exports = {
  getAll,
  getSingle,
  createUser,
  updateUser,
  deleteUser
};
