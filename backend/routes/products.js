const express = require('express')

const router = express.Router()
const Product = require('../models/Product')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./uploads')
    },
    filename : function(req,file,cb){
        cb(null, file.originalname)
    }
})

const fileFilter = (req,file,cb) => {
    if(file.mimetype === 'image/jpeg'  || file.mimetype === 'image/png' )
    cb(null,true)
    else
    cb(null,false)
}

const upload  = multer({
    storage: storage,
    limits: {
        fileSize: 1024*1024*5,
    },
    fileFilter: fileFilter,
},)
// This is to get all the products of a specific vendor

router.get('/', (req,res) => {
    Product.find((err,products) => {
        if(err) res.json(err)
        else res.json(products)
    })
})

//To get a specific product
router.get('/:id',(req,res) => {
    console.log(req.params.id)
    Product.findById(req.params.id,(err,product) => {
        if(err) res.json(err)
        else res.json(product)
    })
})

router.get('/specific/:id',(req,res) => {
    console.log(req.params.id)
    Product.find({seller_id: req.params.id}, (err,product) => {
        if(err) res.json(err)
        else res.json(product)
    })
})




router.patch('/:id', (req,res) => {
    console.log(req.params.id,req.body)

    Product.updateOne({_id:req.params.id},{$set : {qty_remaining:req.body.qty}}, (err,product) => {
        if(err) res.json(err)
        else res.json(product)
    })
})

// Submits a Post
router.post('/', upload.single('productImage') ,(req,res) => {
    let img = ''
    if(req.body.productImage!='')
        img = req.file.path
    // console.log(req.file)
    // console.log(req.body)
    const product = new Product({
        name: req.body.name,
        price : req.body.price,
        qty: req.body.qty,
        seller_id: req.body.id,
        seller_name: req.body.seller_name,
        qty_remaining: req.body.qty,
        productImage: img,
    })
    product.save()
    .then(data => {
        res.status(200).json(data);
    })
    .catch(err =>{
        res.status(404).json({
            message : err,
        })
    })
})

// Delete a Product
router.delete('/:id',(req,res) => {
    console.log(req.params.id)
    const product = Product.deleteOne({_id: req.params.id }, (err,product) =>{
        if(err) res.json(err)
        else res.json(product)
    })
    // res.json(user)
})

router.patch('/rating/:id', async (req,res) => {
    console.log(req.params.id,req.body)
    const id = req.params.id
    var orderr;
    await Product.findById(id,(err,order) => {
        if(err) console.log(err)
        else orderr=order
    })
    const old = orderr.rating*orderr.num_rated
    const new_rated = orderr.num_rated+1
    const newrat = (old+req.body.rating)/(new_rated)
    console.log(new_rated,newrat)
    Product.updateOne({_id:req.params.id},{$set : {rating:newrat,num_rated:new_rated}}, (err,product) => {
        if(err) res.json(err)
        else {res.json(product)}
    })
})

router.patch('/dispatch/:id', (req,res) => {
    Product.updateOne({_id:req.params.id},{$set : {dispatched:true}}, (err,product) => {
        if(err) res.json(err)
        else res.json(product)
    })
})

router.patch('/review/:id', async (req,res) => {
    console.log(req.params.id,req.body)
    const id = req.params.id
    var productt;
    await Product.findById(id,(err,product) => {
        if(err) console.log(err)
        else productt=product
    })
    old_review = productt.review
    old_review.push(req.body)
    console.log(old_review)
    Product.updateOne({_id:id},{$set : {review:old_review}}, (err,product) => {
        if(err) res.json(err)
        else res.json(product)
    })

})





module.exports = router

