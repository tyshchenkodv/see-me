const express = require('express');
const router = express.Router();
const multer = require('multer');
const UserController = require('../controllers/UserController');
const auth = require('../middlewares/auth');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/uploads/')
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

router.get('/:id/avatar', auth, UserController.getAvatar);
router.put('/:id/editAvatar', auth, upload.single('avatar'), UserController.updateAvatar);

module.exports = router;
