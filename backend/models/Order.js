const mongoose = require('mongoose')

const OrderSchema = mongoose.Schema({
    user_id:{
        type: String,
        required: true,
    },
    product_name:{
        type: String,
        required: true,
    },
    product_id:{
        type: String,
        required:true,
    },
    qty:{
        type:Number,
        required:true,
    },
    seller_name:{
        type: String,
        required: true,
    },
    seller_id:{
        type: String,
        required: true,
    },
    status:{
        type:String,
        default:'Waiting',
    },
    rating:{
        type: Number,
        default: 0,
    },
    num_rated:{
        type: Number,
        default: 0,
    }

})
module.exports = mongoose.model('Orders',OrderSchema, 'orders')