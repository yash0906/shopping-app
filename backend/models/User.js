const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required : true,
    },
    pwd : {
        type: String,
        required: true,
    },
    email : {
        type: String,
        required: true,
    },
    vendor : {
        type: Boolean,
        default: false,
    },
    rating:{
        type: Number,
        default: 0,
    },
    num_rated:{
        type: Number,
        default: 0,
    },
    review:{
        type: Array,
    }
})

module.exports = mongoose.model('Users', UserSchema, 'users')