var express = require('express');
var router = express.Router();
const {index, viewCreate, actionCreate, viewedit, actionEdit, actionDelete} = require('./controller')
const multer = require('multer')
const os = require ('os')

/* GET home page. */
router.get('/', index);
router.get('/create', viewCreate),
router.post('/create', multer({dest: os.tmpdir()}).single('image'), actionCreate),
router.get('/edit/:id', viewedit),
router.put('/edit/:id', multer({ dest: os.tmpdir() }).single('image'), actionEdit),
router.delete('/delete/:id', actionDelete),

module.exports = router;