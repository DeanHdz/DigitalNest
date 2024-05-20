const { Router } = require('express');
const { getUsers, createUser, getUser, updateUser, deleteUser } = require('../controllers/users');
const { validateJWT } = require('../middlewares/verifyJWT');
const { verifyAdminRole } = require('../middlewares/verifyAdminRole');

const router = Router();

router.get("/", [validateJWT, verifyAdminRole], getUsers);

router.get("/:id", [validateJWT, verifyAdminRole], getUser);

router.post("/", createUser);

router.put("/:id", [validateJWT], updateUser);

router.delete("/:id", [validateJWT], deleteUser);

module.exports = router;