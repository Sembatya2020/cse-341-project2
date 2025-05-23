const express = require('express');
const router = express.Router();

const booksController = require('../controllers/books');

router.get('/', booksController.getAll); 
router.get('/:id', booksController.getSingle); 

router.post('/',booksController.createUser);
router.put('/:id', booksController.updateUser);
router.delete('/:id', booksController.deleteUser);

module.exports = router;
