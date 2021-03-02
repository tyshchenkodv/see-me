const express = require('express');
const router = express.Router();
const ArticleController = require('../controllers/ArticleController');
const auth = require('../middlewares/auth');
const checkAuthorized = require('../middlewares/checkAuthorized');

router.get('/', ArticleController.list);
router.post('/', auth, ArticleController.create);
router.get('/:id', ArticleController.item);
router.put('/:id', auth, checkAuthorized([
    { permission: 'updateAnyArticle' },
    { permission: 'updateOwnArticle',
      own: {table: 'posts', column: 'userId'}}
]), ArticleController.update);
router.delete('/:id', auth, checkAuthorized([
    { permission: 'deleteAnyArticle' },
    { permission: 'deleteOwnArticle',
      own: {table: 'posts', column: 'userId'}}
]), ArticleController.delete);

module.exports = router;
