const express = require('express')

const router = express.Router()
const Order = require('../models/Order')

router.post('/',(req,res) => {
    let stat = ''
    if(req.body.qty_rem===0)
    stat = 'Placed'
    else
    stat = 'Waiting'
    const order =new Order({
        user_id:req.body.user_id,
        product_name:req.body.product_name,
        product_id:req.body.product_id,
        qty:req.body.qty,
        seller_name:req.body.seller_name,
        seller_id:req.body.seller_id,
        status:stat
    })
    order.save()
    .then(data => {
        res.status(200).json(data);
    })
    .catch(err => {
        res.status(404).json({
            message:err,
        })
    })
})

router.patch('/dispatch/:id',(req,res) => {
    Order.updateOne({product_id:req.params.id},{$set : {status:'Dispatched'}}, (err,product) => {
        if(err) res.json(err)
        else res.json(product)
    })
})


router.patch('/cancel/:id',(req,res) => {
    Order.update({product_id:req.params.id},{$set : {status:'Cancelled'}}, (err,product) => {
        if(err) res.json(err)
        else {res.json(product)}
    })
})

router.get('/:id',(req,res) => {
    console.log(req.params.id)
    Order.find({user_id: req.params.id},(err,orders) => {
        if(err) res.json(err)
        else res.json(orders)
    })
})

router.patch('/rating/:id', async (req,res) => {
    console.log(req.params.id,req.body)
    const id = req.params.id
    var orderr;
    await Order.findById(id,(err,order) => {
        if(err) console.log(err)
        else orderr=order
    })
    const old = orderr.rating*orderr.num_rated
    const new_rated = orderr.num_rated+1
    const newrat = (old+req.body.rating)/(new_rated)
    console.log(new_rated,newrat)
    Order.updateOne({_id:req.params.id},{$set : {rating:newrat,num_rated:new_rated}}, (err,product) => {
        if(err) res.json(err)
        else {res.json(product)}
    })
})

router.patch('/:id', (req,res) => {
    Order.updateOne({_id:req.params.id},{$set : {qty: req.body.qty}}, (err,order) => {
        if(err) res.json(err)
        else {res.json(order)}
    })
})

router.patch('/placed/:id', (req,res) => {
    // console.log("Asdf")
    Order.updateMany({product_id:req.params.id},{$set : {status: 'Placed'}}, (err,order) => {
        if(err) res.json(err)
        else {res.json(order)}
    })
})

module.exports = router