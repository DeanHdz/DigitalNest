const { Router } = require('express');
const { getOrders, getOrder, getOrdersByUserId, createOrder, updateOrder, deleteOrder } = require('../controllers/orders');

const router = Router();

router.get("/", getOrders);

router.get("/:id", getOrder);

router.get("/:userId", getOrdersByUserId);

router.post("/", createOrder);

router.put("/:id", updateOrder);

router.delete("/:id", deleteOrder);

module.exports = router;