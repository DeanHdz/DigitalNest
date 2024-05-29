const { request, response } = require('express'); //Incluimos express para poder usar request y response
const Category = require('../models/category'); //Incluimos el modelo Category para poder hacer operaciones con la base de datos

const getCategories = (req = request, res = response) => {
    Category.find().then(
        (categories) => {
            res.status(200).json({
                categories
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error
            });
        }
    );
}

const getCategory = (req = request, res = response) => {
    const id = req.params.id;
    Category.findById(id).then(
        (category) => {
            res.status(200).json({
                category
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error
            });
        }
    );
}

const createCategory = (req = request, res = response) => {
    const { name } = req.body;
    const category = new Category({ name: name });
    category.save().then(
        (category) => {
            res.status(201).json({
                msg: "Category created"
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                msg: "Category not created: " + error
            });
        }
    );
}

const updateCategoryName = (req = request, res = response) => {
    const id = req.params.id;
    const { name } = req.body
    Category.findByIdAndUpdate(id, {
        name: name
    }).then(
        () => {
            res.status(200).json({
                msg: "Category updated"
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                msg: "Category not updated: " + error
            });
        }
    );
}

const insertProductIntoCategory = (req = request, res = response) => {
    const id = req.params.id;
    const { productId } = req.body;

    Category.findByIdAndUpdate(
        id,
        { $addToSet: { products: productId } },  // Cambiado de $push a $addToSet para evitar repetidos
        { new: true }
    ).then(() => {
        res.status(200).json({
            msg: "Product inserted into category"
        });
    }).catch((error) => {
        res.status(400).json({
            msg: "Product not inserted into category: " + error
        });
    });
}

const removeProductFromCategory = (req = request, res = response) => {
    const id = req.params.id;
    const { productId } = req.body;

    Category.findByIdAndUpdate(
        id,
        { $pull: { products: productId } },
        { new: true }
    ).then(() => {
        res.status(200).json({
            msg: "Product removed from category"
        });
    }).catch((error) => {
        res.status(400).json({
            msg: "Product not removed from category: " + error
        });
    });
}


const deleteCategory = (req = request, res = response) => {
    const id = req.params.id;
    Category.findByIdAndDelete(id).then(
        () => {
            res.status(200).json({
                msg: "Category deleted"
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                msg: "Category not deleted: " + error
            });
        }
    );
}

module.exports = {
    getCategories,
    getCategory,
    createCategory,
    updateCategoryName,
    insertProductIntoCategory,
    removeProductFromCategory,
    deleteCategory
}