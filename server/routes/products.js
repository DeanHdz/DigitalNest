const { Router } = require('express');
const { getProducts, getProduct, getProductsByCategory, createProduct, updateProduct, deleteProduct } = require('../controllers/products');
const { validateJWT } = require('../middlewares/verifyJWT');
const { verifyAdminRole } = require('../middlewares/verifyAdminRole');

const router = Router();

router.get("/", getProducts);

router.get("/:id", getProduct);

router.get("/:category", getProductsByCategory);

router.post("/", [validateJWT, verifyAdminRole], createProduct);

router.put("/:id", [validateJWT, verifyAdminRole], updateProduct);

router.delete("/:id", [validateJWT, verifyAdminRole], deleteProduct);

module.exports = router;