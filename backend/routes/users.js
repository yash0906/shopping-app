const express = require('express')

const router = express.Router()
const User = require('../models/User')
// Get back all the posts
router.get('/', (req,res) => {
    User.find((err,users) => {
        if(err) res.json(err)
        else res.json(users)
    })
})
router.post('/check',(req,res) => {
    console.log(req.body)
    User.findOne({username: req.body.username, pwd: req.body.pwd}, (err,user) => {
        if(err) console.log(err)
        else res.json(user)
    })
})
//specific POst
router.get('/:id',(req,res) => {
    const id = req.params.id
    User.findById(id,(err,user) => {
        if(err) res.json(err)
        else res.send(user)
    })
})

// Delete a Post
router.delete('/:id',(req,res) => {
    const user = User.deleteOne({_id: req.params.id }, (err,user) =>{
        if(err) res.json(err)
        else res.json(user)
    })
    // res.json(user)
})

// Update User info
router.patch('/:id', (req,res) => {
    User.updateOne({_id: req.params.id},{ $set : {username:req.body.username}},(err,user) => {
        if(err) res.json(err)
        else res.json(user)
    })
})

// Submits a Post
router.post('/',(req,res) => {
    const user = new User({
        username: req.body.username,
        pwd : req.body.pwd,
        email: req.body.email,
        vendor: req.body.vendor,
    })
    user.save()
    .then(data => {
        res.status(200).json(data);
    })
    .catch(err =>{
        res.status(404).json({
            message : err,
        })
    })
})

router.patch('/rating/:id', async (req,res) => {
    console.log(req.params.id,req.body)
    const id = req.params.id
    var orderr;
    await User.findById(id,(err,order) => {
        if(err) console.log(err)
        else orderr=order
    })
    const old = orderr.rating*orderr.num_rated
    const new_rated = orderr.num_rated+1
    const newrat = (old+req.body.rating)/(new_rated)
    console.log(new_rated,newrat)
    User.updateOne({_id:req.params.id},{$set : {rating:newrat,num_rated:new_rated}}, (err,product) => {
        if(err) res.json(err)
        else {res.json(product)}
    })
})

router.patch('/review/:id', async (req,res) => {
    console.log(req.params.id,req.body)
    const id = req.params.id
    var userr;
    await User.findById(id,(err,user) => {
        if(err) console.log(err)
        else userr=user
    })
    old_review = userr.review
    old_review.push(req.body)
    console.log(old_review)
    User.updateOne({_id:id},{$set : {review:old_review}}, (err,user) => {
        if(err) res.json(err)
        else res.json(user)
    })

})


module.exports = router
