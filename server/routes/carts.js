const { Router } = require('express');
const { getCarts, getCart, getCartByUserId, createCart, updateCart, deleteCart } = require('../controllers/carts');

const router = Router();

router.get("/", getCarts);

router.get("/:id", getCart);

router.get("/:userId", getCartByUserId);

router.post("/", createCart);

router.put("/:id", updateCart);

router.delete("/:id", deleteCart);

module.exports = router;