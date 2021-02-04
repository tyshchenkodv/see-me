const express = require('express');
const router = express.Router();
const PostController = require('../controllers/PostController');
const auth = require('../middlewares/auth');
const checkAuthorized = require('../middlewares/checkAuthorized');

router.get('/', PostController.list);
router.post('/', auth, PostController.create);
router.get('/:id', PostController.item);
router.put('/:id', auth, checkAuthorized([
    { permission: 'updateAnyPost' },
    { permission: 'updateOwnPost',
      own: {table: 'posts', column: 'userId'}}
]), PostController.update);
router.delete('/:id', auth, checkAuthorized([
    { permission: 'deleteAnyPost' },
    { permission: 'deleteOwnPost',
      own: {table: 'posts', column: 'userId'}}
]), PostController.delete);

module.exports = router;
