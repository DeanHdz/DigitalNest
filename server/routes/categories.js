const { Router } = require('express');
const { getCategories, getCategory, createCategory, updateCategory, deleteCategory } = require('../controllers/categories');
const { validateJWT } = require('../middlewares/verifyJWT');
const { verifyAdminRole } = require('../middlewares/verifyAdminRole');

const router = Router();

router.get("/", getCategories);

router.get("/:id", getCategory);

router.post("/", [validateJWT, verifyAdminRole], createCategory);

router.put("/:id", [validateJWT, verifyAdminRole], updateCategory);

router.delete("/:id", [validateJWT, verifyAdminRole], deleteCategory);

module.exports = router;