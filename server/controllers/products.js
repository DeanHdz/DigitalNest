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

//Falta arreglar
const getProductsByCategory = (req = request, res = response) => {
    const categoryId = req.params.categoryId;
    Product.find({
        _Id: categoryId
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
    const { name, description, price, img, stockQuantity } = req.body;
    const product = new Product({ name: name, description: description, price: price, img: img, stockQuantity: stockQuantity });
    product.save().then(
        () => {
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
    const { name, description, price, img, stockQuantity } = req.body;
    Product.findByIdAndUpdate(id, {
        name: name,
        description: description,
        price: price,
        img: img,
        stockQuantity: stockQuantity
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