const express = require('express');
const router = express.Router();
const authorsController = require('../controllers/authors');
const { isAuthenticated } = require('../middleware/authenticate');

// GET routes - public
router.get('/', authorsController.getAll);
router.get('/:id', authorsController.getSingle);

// POST, PUT, DELETE routes - protected
router.post('/', isAuthenticated, authorsController.createAuthor);
router.put('/:id', isAuthenticated, authorsController.updateAuthor);
router.delete('/:id', isAuthenticated, authorsController.deleteAuthor);

module.exports = router;
