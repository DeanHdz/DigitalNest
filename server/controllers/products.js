const { request, response } = require('express'); //Incluimos express para poder usar request y response
const Product = require('../models/product'); //Incluimos el modelo Product para poder hacer operaciones con la base de datos

const getProducts = (req = request, res = response) => {
    Product.find().then(
        (products) => {
            res.status(200).json({
                products
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

const getProductsByCategory = (req = request, res = response) => {
    const category = req.params.category;
    Product.find({
        category: category
    }).then(
        (products) => {
            res.status(200).json({
                products
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

const getProduct = (req = request, res = response) => {
    const id = req.params.id;
    Product.findById(id).then(
        (product) => {
            res.status(200).json({
                product
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

const createProduct = (req = request, res = response) => {
    const { name, price, category } = req.body;
    const product = new Product({ name, price, category });
    product.save().then(
        (product) => {
            res.status(201).json({
                msg: "Product created"
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                msg: "Product not created: " + error
            });
        }
    );
}

const updateProduct = (req = request, res = response) => {
    const id = req.params.id;
    const { name, price, category } = req.body;
    Product.findByIdAndUpdate(id, {
        name: name,
        price: price,
        category: category
    }).then(
        () => {
            res.status(200).json({
                msg: "Product updated"
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                msg: "Product not updated: " + error
            });
        }
    );
}

const deleteProduct = (req = request, res = response) => {
    const id = req.params.id;
    Product.findByIdAndDelete(id).then(
        () => {
            res.status(200).json({
                msg: "Product deleted"
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                msg: "Product not deleted: " + error
            });
        }
    );
}

module.exports = {
    getProducts,
    getProductsByCategory,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}