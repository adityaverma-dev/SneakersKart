const express = require('express')
const router = express.Router();
const productController = require('../controllers/product.controller')
const auth = require('../middleware/auth')
const { addProductValidator } = require('../middleware/validations')
const formidableMiddleware = require('express-formidable')

router.post('/', auth('createAny', 'product'), addProductValidator, productController.addProduct);

router.route('/product/:id')
.get(productController.getProductById)
.patch(auth('updateAny', 'product'), productController.updateProductById)
.delete(auth('deleteAny', 'product'), productController.deleteProductById)

router.get('/all', productController.allProducts);
router.post('/paginate/all', productController.paginateProducts)

//Upload Images
router.post('/upload', auth('createAny', 'product'), formidableMiddleware(), productController.picUpload)

module.exports = router; 
