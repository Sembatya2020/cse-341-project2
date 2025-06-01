const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books');
const { validateToken } = require('../middleware/validation');

const {isAuthenticated} = require('../middleware/authenticate');

// GET routes - typically public (no authentication required)
router.get('/', booksController.getAll);
router.get('/:id', booksController.getSingle);

// POST, PUT, DELETE routes - protected with authentication
router.post('/', isAuthenticated, booksController.createBook);
router.put('/:id', isAuthenticated, booksController.updateBook);
router.delete('/:id', isAuthenticated, booksController.deleteBook);

module.exports = router;