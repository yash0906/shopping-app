const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')

const app = express();
const PORT = 5000;
const userRoutes = express.Router();
app.use(cors());
app.use(bodyParser.json());

let User = require('./models/user');
let Products = require('./models/products');


// app.use(cors());
// app.use(bodyParser.json());

// Connection to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/users', { useNewUrlParser: true });
// mongoose.connect('mongodb://127.0.0.1:27017/products', { useNewUrlParser: true });

const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established succesfully.");
})


var personal_username_for_display;


// API endpoints

// Adding a new user
userRoutes.route('/add').post(function(req, res) {
    // console.log("ghjkl;kjhgfhjkl");
    let user = new User(req.body);
    // console.log(user.username);
    user.save()
        .then(user => {
            res.status(200).json({'User': 'User added successfully'});
            // console.log(user.user_type);

            // console.log("Added");
        })
        .catch(err => {
            res.status(400).send('Error');
        });
});

//Adding a product

userRoutes.route('/add_product').post(function(req, res) {
    // console.log("ghjklkjhgfhjkl");
    let product = new Products(req.body);
    // console.log(user.username);
    product.save()
        .then(product => {
            res.status(200).json({'Products': 'Product added successfully'});
            // console.log(user.user_type);
            console.log("kjyhtbgrvfecvgrhjghjklkjhgfhjkl");
            // console.log("Added");
        })
        .catch(err => {
            console.log("faillllllllllll  kjyhtbgrvfecvgrhjghjklkjhgfhjkl");

            res.status(400).send('Error');
        });
});


// Getting all the users
userRoutes.route('/get_registered_users').get(function(req, res) {
            console.log("Addedesdfghjkhygtfrdfghjkl");
    User.find(function(err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});




//Getting all the products

userRoutes.route('/get_all_products').get(function(req, res) {
    // console.log("fdcfghjklkjhg");
    Products.find(function(err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});


// getting personal products of vendors
userRoutes.route('/find_personal_products_of_vendors').get(function(req,res){
    username = req.body.username;
    User.find({username : username},function(err,vendor_exist1){
        Products.find(function(err, hii) {
        if(err) {
            console.log(err);
        } else {
            res.json(hii);
        }
    });
});


// userRoutes.route('/find_personal_products_of_vendors').get(function(req, res) {
//     // console.log("fdcfghjklkjhg");
//     Products.find(function(err, users) {
//         if (err) {
//             console.log(err);
//         } else {
//             res.json(users);
//         }
//     });
// });

userRoutes.route('/login').post(function(req,res) {
    // console.log("xdfghjkl");
    // const username = req.body.username
    User.find({username : req.body.username},function(err,user_exist1){
        // console.log(user_exist1)
        if(err) 
        {
            console.log(err);
        } 
        if (!user_exist1.length)
        {
            console.log("Username doesn't exist. Please register.");
            // res.status(420).json({ UsernameNotFound: "Username not found" });
            res.send("1");
        }
        else
        {
            // const password = req.body.password
            User.find({password : req.body.password},function(err,user_exist2){  
                if(err) 
                {
                    console.log(err);
                }    
                if (!user_exist2.length)
                {
                    res.send("2");
                    // res.status(400).json({ passwordincorrect: "Password incorrect" });
                }   
                else
                {
                    if(user_exist1[0].user_type === "customer")
                    {
                        console.log("Customer haiiiii");
                        res.send("3");
                    }
                    else(user_exist1[0].user_type === "vendor")
                    {
                        console.log("Vendor haiiiiiii");
                        res.send("4");
                    }
                }
            });    
        }
    });
});

// Getting a user by id
userRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    User.findById(id, function(err, user) {
        res.json(user);
    });
});

app.use('/', userRoutes);

app.listen(PORT, function() {
    console.log("Server is running on port: " + PORT);
});
