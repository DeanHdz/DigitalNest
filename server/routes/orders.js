const { Router } = require('express');
const { getOrders, getOrder, getOrdersByUserId, createOrder, updateOrder, deleteOrder } = require('../controllers/orders');
const { validateJWT } = require('../middlewares/verifyJWT');
const { verifyAdminRole } = require('../middlewares/verifyAdminRole');

const router = Router();

router.get("/", [validateJWT, verifyAdminRole], getOrders);

router.get("/:id", [validateJWT], getOrder);

router.get("/user/:userId", [validateJWT], getOrdersByUserId);

router.post("/", [validateJWT], createOrder);

router.put("/:id", [validateJWT], updateOrder);

router.delete("/:id", [validateJWT, verifyAdminRole], deleteOrder);

module.exports = router;