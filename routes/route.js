const router = require('express').Router();
const authMiddleware = require('../middleware/authMiddleware.js');
//Wrong export need to export from sellerCotroller instead of orderController
const {
    sellerRegister,
    sellerLogIn
} = require('../controllers/sellerController.js');

const {
    productCreate,
    getProducts,
    getProductDetail,
    //controllers not imported 
    searchProduct,
    //controllers not imported 
    searchProductbySubCategory,
    searchProductbyCategory,
    getSellerProducts,
    updateProduct,
    deleteProduct,
    deleteProducts,
    deleteProductReview,
    deleteAllProductReviews,
    addReview,
    getInterestedCustomers,
    getAddedToCartProducts,
} = require('../controllers/productController.js');

const {
    customerRegister,
    customerLogIn,
    getCartDetail,
    cartUpdate
} = require('../controllers/customerController.js');

const {
    newOrder,
    getOrderedProductsBySeller,
    //controllers not imported 
    getOrderedProductsByCustomer
} = require('../controllers/orderController.js');

// Seller
router.post('/SellerRegister', sellerRegister);
router.post('/SellerLogin', sellerLogIn);

// Product
router.post('/ProductCreate', authMiddleware, productCreate);
router.get('/getSellerProducts/:id', authMiddleware, getSellerProducts);
router.get('/getProducts', authMiddleware, getProducts);
router.get('/getProductDetail/:id', authMiddleware, getProductDetail);
router.get('/getInterestedCustomers/:id', authMiddleware, getInterestedCustomers);
router.get('/getAddedToCartProducts/:id', authMiddleware, getAddedToCartProducts);

router.put('/ProductUpdate/:id', authMiddleware, updateProduct);
router.put('/addReview/:id', authMiddleware, addReview);

// wrong controller called
router.get('/searchProduct/:key', authMiddleware, searchProduct);
router.get('/searchProductbyCategory/:key', authMiddleware, searchProductbyCategory);
// wrong controller called
router.get('/searchProductbySubCategory/:key', authMiddleware, searchProductbySubCategory);

router.delete('/DeleteProduct/:id', authMiddleware, deleteProduct);
router.delete('/DeleteProducts/:id', authMiddleware, deleteProducts);
router.delete('/deleteProductReview/:id', authMiddleware, deleteProductReview);
router.put('/deleteAllProductReviews/:id', authMiddleware, deleteAllProductReviews);

// Customer
router.post('/CustomerRegister', customerRegister);
router.post('/CustomerLogin', customerLogIn);
router.get('/getCartDetail/:id', authMiddleware, getCartDetail);
router.put('/CustomerUpdate/:id', authMiddleware, cartUpdate);

// Order
router.post('/newOrder', authMiddleware, newOrder);
// wrong controller called
router.get('/getOrderedProductsByCustomer/:id', authMiddleware, getOrderedProductsByCustomer);
router.get('/getOrderedProductsBySeller/:id', authMiddleware, getOrderedProductsBySeller);

// routers were not exported
module.exports = router;