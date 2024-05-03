const { Router } = require('express');
const { getUsers, createUser, getUser, updateUser, deleteUser } = require('../controllers/users');

const router = Router();

router.get("/", getUsers);

//Es una subruta de la ruta /api/users
router.get("/:id", getUser);

router.post("/", createUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

module.exports = router;