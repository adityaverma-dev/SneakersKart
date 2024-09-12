const express = require('express')
const router = express.Router();
const auth = require('../middleware/auth');
const brandscontroller = require('../controllers/brand.controller');

router.route('/brand/:id')
.get(brandscontroller.getBrand)
.delete( auth('deleteAny', 'brand'), brandscontroller.deleteBrand)

router.post('/brand', auth('createAny', 'brand'), brandscontroller.addBrand)
router.get('/all', brandscontroller.getBrands)



module.exports = router;