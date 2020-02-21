const mongoose  = require('mongoose')

const ProductSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required :true,
    },
    qty:{
        type: Number,
        required : true,
    },
    seller_id:{
        type: String,
        required: true,
    },
    seller_name:{
        type: String,
        required: true, 
    },
    qty_remaining:{
        type: Number,
    },
    rating:{
        type: Number,
        default: 0,
    },
    num_rated:{
        type: Number,
        default: 0,
    },
    dispatched:{
        type:Boolean,
        default:false,
    },
    review:{
        type: Array,
    },
    productImage:{
        type:String,
        default:''
    }
})

module.exports = mongoose.model('Products', ProductSchema, 'products')