const { Router } = require('express');
const { getCarts, getCart, getCartByUserId, createCart, addProduct, removeProduct, updateCart, deleteCart } = require('../controllers/carts');
const { validateJWT } = require('../middlewares/verifyJWT');
const { verifyAdminRole } = require('../middlewares/verifyAdminRole');

const router = Router();

router.get("/", [validateJWT, verifyAdminRole], getCarts);

router.get("/:id", [validateJWT], getCart);

router.get("/user/:userId", [validateJWT], getCartByUserId);

router.post("/", [validateJWT], createCart);

router.post("/user/:userId/product/:productId", [validateJWT], addProduct);

router.delete("/user/:userId/product/:productId", [validateJWT], removeProduct);

router.put("/:id", [validateJWT], updateCart);

router.delete("/:id", [validateJWT, verifyAdminRole], deleteCart);

module.exports = router;