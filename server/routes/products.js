const { Router } = require('express');
const { getProducts, getProduct, getProductsByCategory, createProduct, updateProduct, deleteProduct } = require('../controllers/products');

const router = Router();

router.get("/", getProducts);

router.get("/:id", getProduct);

router.get("/:category", getProductsByCategory);

router.post("/", createProduct);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

module.exports = router;