var express = require('express');
var router = express.Router();
const {index, viewCreate, actionCreate, viewedit, actionEdit, actionDelete} = require('./controller')

/* GET home page. */
router.get('/', index);
router.get('/create', viewCreate),
router.post('/create', actionCreate),
router.get('/edit/:id', viewedit),
router.put('/edit/:id', actionEdit),
router.delete('/delete/:id', actionDelete),

module.exports = router;