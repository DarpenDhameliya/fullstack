const fetchuser = require('../middleware/Fetchuser');

const router = require('express').Router();

router.use('/auth',require('./Auth'))
// router.use('/authers',require('./Pdf_email'))
router.use('/product',fetchuser,require('./Product'))
router.use('/party',fetchuser,require('./Party'))
router.use('/admin',fetchuser,require('./AdminProduct'))
router.use('/admin/sell',fetchuser,require('./Admin_productsell'))
router.use('/admin/sellreport',fetchuser,require('./sellReport'))

module.exports = router