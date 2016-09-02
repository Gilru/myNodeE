express = require("express");
const wagner = require("wagner-core");
require("./Setup/factory")(wagner);
const status = require("http-status-codes")
const ObjectId = require('mongoose').Types.ObjectId;


module.exports = function (app) {
    //import stripe
    var stripe = require("stripe")(
        process.env.STRIPETESTTOKEN
    );

    var router = express.Router();
    app.use("/api/v1", router)

    //====================only create a quick database======================
    var categoy;
    var product;
    wagner.invoke(function (Category) {

        Category.remove({}).exec();

        categoy = new Category({
            _id: "Iphone",
            parent: "Electronic"
        })

        categoy.save();

    })

    wagner.invoke(function (Product) {

        Product.remove({}).exec();

        product = new Product({
            name: "Iphone",
            price: {
                amount: 15,
                currency: "EUR"
            },
            category: categoy
        })

        product.save();

    })

    wagner.invoke(function (User) {
        User.remove({}).exec();

        var user = new User({
            profile: {
                username: "Gilbert",
                email: "example@email.com"
            },
            data: {
                cart: {
                    product: product._id
                }

            }
        })

        // user.data.cart.push(product._id);

        user.save();
    })


    //====================only create a quick database======================


    router.get("/parent/:parentValue", function (req, res) {


        wagner.invoke(function (Category) {

            Category.find({parent: req.params.parentValue}, function (err, category) {
                if (err)  res.status(status.INTERNAL_SERVER_ERROR).json(err);
                res.json(category);

            })

        })

    })


    router.get("/product/id/:id", function (req, res) {


        wagner.invoke(function (Product) {

            Product.find({_id: new ObjectId(req.params.id)}, function (err, product) {
                if (err)  res.status(status.INTERNAL_SERVER_ERROR).json(err.message);

                res.json(product);
            })

        })

    })

    router.get("/products", function (req, res) {


        wagner.invoke(function (Product) {

            Product.find(function (err, product) {
                if (err)  res.status(status.INTERNAL_SERVER_ERROR).json(err.message);

                res.json(product);
            })

        })

    })
    //TODO to be tested
    router.get("/products/:productName", function (req, res) {

        wagner.invoke(function (Product) {

            var query = Product.find({$text: {$search: req.params.productName}},
                {score: {$meta: "textScore"}})
                .sort({score: {$meta: "textScore"}})


            query.exec(function (err,product) {
                if (err) return console.log(err);
                res.json(product);
            })

        })

    })
    router.get("/product/category/:id", function (req, res) {


        wagner.invoke(function (Product) {

            Product.find({"category._id": "Iphone"}, function (err, product) {
                if (err)  res.status(status.INTERNAL_SERVER_ERROR).json(err.message);
                res.json(product);
            })

        })

    })
//==========TODO Build the add cart and test add cart and this one should only be for processing
    router.post("/me/cart", function (req, res) {
        var products = [];
        if (!req.user) return res.status(status.INTERNAL_SERVER_ERROR).json({error: "can't access file"})
        wagner.invoke(function (Product) {

            Product.find(function (err, product) {
                if (err)  return res.status(status.INTERNAL_SERVER_ERROR).json(err.message);

                product.forEach(function (element) {
                    products.push(element._id)
                })


                req.user.data.cart = [{product: product[0]._id}]


                req.user.save(function (err, user) {

                    if (err) return console.log(err);
                    req.login(user, function (err) {
                        if (err) return console.log(err)
                        //STRIPE CHARGE
                        stripe.charges.create({
                            amount: 999,
                            currency: "usd",
                            source: process.env.STRIPESOURCETOKEN, // obtained with Stripe.js
                            description: "Charge for the shopping"
                        }, function (err, charge) {
                            // asynchronously called
                            if (err) return console.log(err)

                            return res.redirect("/api/v1/users/" + user.profile.username)
                        });


                    })
                })


            })

        })


    })

    //==================TODO to be deleted=====================
    router.get("/users", function (req, res) {
        wagner.invoke(function (User) {
            User.findOne({}).populate("data.cart.product").exec(function (err, users) {
                if (err)console.log(err)
                res.send(users);
            })
        })
    })

    router.get("/users/:username", function (req, res) {

        res.json(req.user);
        // wagner.invoke(function (User) {
        //     User.findOne({_id: req.params}).populate("data.cart.product").exec(function (err, users) {
        //         if (err)console.log(err)
        //         res.send(users);
        //     })
        // })
    })

    router.get("/user",function (req, res) {
        if (req.user)
            return res.json(req.user);
        else
            return res.status(status.FORBIDDEN).json({ error: 'please login first' });
    })
}


