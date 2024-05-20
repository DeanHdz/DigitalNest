const { request, response } = require('express'); //Incluimos express para poder usar request y response
const Order = require('../models/order'); //Incluimos el modelo Order para poder hacer operaciones con la base de datos

const getOrders = (req = request, res = response) => {
    Order.find().then(
        (orders) => {
            res.status(200).json({
                orders
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

const getOrdersByUserId = (req = request, res = response) => {
    const userId = req.params.userId;
    Order.find({ userId: userId }).then(
        (orders) => {
            res.status(200).json({
                orders
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


const getOrder = (req = request, res = response) => {
    const id = req.params.id;
    Order.findById(id).then(
        (order) => {
            res.status(200).json({
                order
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

const createOrder = (req = request, res = response) => {
    const { userId, products } = req.body;
    const order = new Order({ userId: userId, products: products });
    order.save().then(
        (order) => {
            res.status(201).json({
                msg: "Order created"
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                msg: "Order not created: " + error
            });
        }
    );
}

const updateOrder = (req = request, res = response) => {
    const id = req.params.id;
    const { userId, products } = req.body
    Order.findByIdAndUpdate(id, { userId: userId, products: products }).then(
        () => {
            res.status(200).json({
                msg: "Order updated"
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                msg: "Order not updated: " + error
            });
        }
    );
}

const deleteOrder = (req = request, res = response) => {
    const id = req.params.id;
    Order.findByIdAndDelete(id).then(
        () => {
            res.status(200).json({
                msg: "Order deleted"
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                msg: "Order not deleted: " + error
            });
        }
    );
}

module.exports = {
    getOrders,
    getOrdersByUserId,
    getOrder,
    createOrder,
    updateOrder,
    deleteOrder
}