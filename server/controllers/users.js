const { request, response } = require('express'); //Incluimos express para poder usar request y response
const User = require('../models/user'); //Incluimos el modelo User para poder hacer operaciones con la base de datos

const getUsers = (req = request, res = response) => {
    User.find().then(
        (users) => {
            res.status(200).json({
                users
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

const getUser = (req = request, res = response) => {
    const id = req.params.id;
    User.findById(id).then(
        (user) => {
            res.status(200).json({
                user
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

const createUser = (req = request, res = response) => {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    user.save().then(
        (user) => {
            res.status(201).json({
                msg: "User created"
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                msg: "User not created: " + error
            });
        }
    );
}

const updateUser = (req = request, res = response) => {
    const id = req.params.id;
    const { name, email, password } = req.body;
    User.findByIdAndUpdate
        (id, { name, email, password }).then(
            () => {
                res.status(200).json({
                    msg: "User updated"
                });
            }
        ).catch(
            (error) => {
                res.status(400).json({
                    msg: "User not updated: " + error
                });
            }
        );
}

const deleteUser = (req = request, res = response) => {
    const id = req.params.id;
    User.findByIdAndDelete(id).then(
        () => {
            res.status(200).json({
                msg: "User deleted"
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                msg: "User not deleted: " + error
            });
        }
    );
}

module.exports = {
    getUser,
    getUsers,
    createUser,
    updateUser,
    deleteUser
}