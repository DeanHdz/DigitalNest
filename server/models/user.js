const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user: {
        type: String,
        required: [true, 'Name is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    role: {
        type: String,
        required: [true, 'Role is required'],
        default: 'client'
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    }
    
});

module.exports = mongoose.model('User', userSchema);