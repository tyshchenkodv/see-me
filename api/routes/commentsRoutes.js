const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const CommentController = require('../controllers/CommentController');

router.post('/', auth, CommentController.create);
router.put('/:id', auth, CommentController.update);
router.delete('/:id', auth, CommentController.delete);

module.exports = router;
