const { request, response } = require('express'); //Incluimos express para poder usar request y response
const Cart = require('../models/cart'); //Incluimos el modelo Cart para poder hacer operaciones con la base de datos

const getCarts = (req = request, res = response) => {
    Cart.find().then(
        (carts) => {
            res.status(200).json({
                carts
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

const getCart = (req = request, res = response) => {
    const id = req.params.id;
    Cart.findById(id).then(
        (cart) => {
            res.status(200).json({
                cart
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

const createCart = (req = request, res = response) => {
    const { userId } = req.body;
    const cart = new Cart({ userId: userId });
    cart.save().then(
        (cart) => {
            res.status(201).json({
                msg: "Cart created"
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                msg: "Cart not created: " + error
            });
        }
    );
}

const addProductToCart = (req = request, res = response) => {
    const userId = req.params.userId;
    const productId = req.params.productId;

    Cart.findOne({ userId })
        .then(cart => {
            if (cart) {
                const quantity = 1;

                // Si el carrito existe, verificamos si el producto ya está en el carrito usando su id
                const existingProductIndex = cart.products.findIndex(product => product.productId.toString() === productId);

                if (existingProductIndex !== -1) {
                    // Si el producto ya está en el carrito, actualizamos su cantidad
                    cart.products[existingProductIndex].quantity += quantity;
                } else {
                    // Si el producto no está en el carrito, lo agregamos
                    cart.products.push({ productId, quantity });
                }

                // Guardamos los cambios en el carrito
                return cart.save();
            } else {
                // Si el carrito no existe, retornamos un error
                return Promise.reject(new Error('No cart found for user.'));
            }
        }).then(
            (updatedCart) => {
                res.status(200).json({
                    msg: "Product added to cart",
                    cart: updatedCart
                });
                console.log('Carrito actualizado:', updatedCart);
            }
        ).catch(
            (error) => {
                res.status(400).json({
                    msg: "Product not added to cart: " + error.message
                });
                console.error('Error al actualizar el carrito:', error);
            }
        );
}

const updateCart = (req = request, res = response) => {
    const id = req.params.id;
    const { userId, products } = req.body;
    Cart.findByIdAndUpdate(id, { userId: userId, products: products }).then(
        () => {
            res.status(200).json({
                msg: "Cart updated"
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                msg: "Cart not updated: " + error
            });
        }
    );
}

const deleteCart = (req = request, res = response) => {
    const id = req.params.id;
    Cart.findByIdAndDelete(id).then(
        () => {
            res.status(200).json({
                msg: "Cart deleted"
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                msg: "Cart not deleted: " + error
            });
        }
    );
}

const getCartByUserId = (req = request, res = response) => {
    const userId = req.params.userId;

    Cart.findOne({ userId: userId }).then(
        (cart) => {
            if (!cart) {
                // Si el carrito no existe, creamos uno nuevo
                const newCart = new Cart({ userId: userId, products: [] });

                newCart.save().then(
                    (createdCart) => {
                        res.status(200).json({
                            message: "No se encontró carrito, se ha creado uno nuevo.",
                            cart: createdCart
                        });
                    }
                ).catch(
                    (error) => {
                        res.status(500).json({
                            message: "Error al crear el carrito",
                            error
                        });
                    }
                );
            } else {
                // Si el carrito existe, lo devolvemos
                res.status(200).json({
                    cart
                });
            }
        }
    ).catch(
        (error) => {
            res.status(500).json({
                message: "Error al buscar el carrito",
                error
            });
        }
    );
}

module.exports = {
    getCarts,
    getCart,
    getCartByUserId,
    createCart,
    addProductToCart,
    updateCart,
    deleteCart
}