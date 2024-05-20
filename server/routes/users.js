const { Router } = require('express');
const { getUsers, createUser, getUser, updateUser, deleteUser } = require('../controllers/users');

const router = Router();

router.get("/", getUsers);

router.get("/:id", getUser);

router.post("/", createUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

module.exports = router;