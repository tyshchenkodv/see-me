const express = require('express');
const router = express.Router();
const ArticleController = require('../controllers/ArticleController');
const auth = require('../middlewares/auth');
const validationErros = require('../middlewares/validationErrors');
const checkAuthorized = require('../middlewares/checkAuthorized');
const { body } = require('express-validator');
const { isUnique } = require('../services/routeValidator');

router.get('/', ArticleController.list);

router.post('/', auth,
    body('title')
        .custom(value => isUnique('articles', 'title', value))
        .withMessage('Article with such title already exists')
        .not().isEmpty({ignore_whitespace: true})
        .withMessage('Article title can\'t be empty')
        .isLength({max: 255})
        .withMessage('Article title can\'t be longer than 255 characters'),
    body('text')
        .not().isEmpty({ignore_whitespace: true})
        .withMessage('Article text can\'t be empty'),
    validationErros, ArticleController.create);

router.get('/:id', ArticleController.item);

router.put('/:id', auth, checkAuthorized([
    { permission: 'updateAnyArticle' },
    { permission: 'updateOwnArticle',
      own: {table: 'articles', column: 'userId'}}
    ]),
    body('title')
        .custom((value, {req}) =>
            isUnique('articles', 'title', value, req.params.id))
        .not().isEmpty({ignore_whitespace: true})
        .withMessage('Article title can\'t be empty')
        .isLength({max: 255})
        .withMessage('Article title can\'t be longer than 255 characters'),
    body('text')
        .not({ignore_whitespace: true}).isEmpty()
        .withMessage('Article text can\'t be empty'),
    validationErros, ArticleController.update);

router.delete('/:id', auth, checkAuthorized([
    { permission: 'deleteAnyArticle' },
    { permission: 'deleteOwnArticle',
      own: {table: 'articles', column: 'userId'}}
]), ArticleController.delete);

module.exports = router;
