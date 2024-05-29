const { Router } = require('express');
const { getCategories, getCategory, createCategory, updateCategoryName, insertProductIntoCategory, removeProductFromCategory, deleteCategory } = require('../controllers/categories');
const { validateJWT } = require('../middlewares/verifyJWT');
const { verifyAdminRole } = require('../middlewares/verifyAdminRole');

const router = Router();

router.get("/", getCategories);

router.get("/:id", getCategory);

router.post("/", [validateJWT, verifyAdminRole], createCategory);

router.put("/:id", [validateJWT, verifyAdminRole], updateCategoryName);

router.put("/:id/products", [validateJWT, verifyAdminRole], insertProductIntoCategory);

router.delete("/:id/products/:id", [validateJWT, verifyAdminRole], removeProductFromCategory);

router.delete("/:id", [validateJWT, verifyAdminRole], deleteCategory);

module.exports = router;