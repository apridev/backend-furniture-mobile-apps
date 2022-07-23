var express = require('express');
var router = express.Router();
const {landingpage, detailPage} = require('./controller')

/* GET home page. */
router.get('/landingpage', landingpage);
router.get('/:id/detail', detailPage);

module.exports = router;