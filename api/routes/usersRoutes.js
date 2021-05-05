const express = require('express');
const router = express.Router();
const multer = require('multer');
const UserController = require('../controllers/UserController');
const auth = require('../middlewares/auth');
const crypto = require('crypto');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../uploads')
    },
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
                if (err) {
                    return cb(err)
                } else {
                    cb(null, raw.toString('hex') + '.' + file.mimetype.split('/')[1]);
                }
            }
        )
    }
});

const upload = multer({storage: storage});

router.get('/avatar/:fileName', UserController.getAvatar);
router.get('/token', auth, UserController.getUserByToken);
router.put('/:id/updateAvatar', auth, upload.single('avatar'), UserController.updateAvatar);
router.put('/:id/edit', auth, UserController.updateUser);
router.get('/:id', UserController.getUserById);

module.exports = router;
