express = require("express");
const wagner = require("wagner-core");
require("./Setup/factory")(wagner);
const status = require("http-status-codes")
const ObjectId = require('mongoose').Types.ObjectId;


module.exports = function (app) {

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
                username:" Gilbert",
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

           Product.find({_id: new ObjectId(req.params.id)},function (err, product) {
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
    router.get("/product/category/:id", function (req, res) {


        wagner.invoke(function (Product) {

            Product.find({"category._id": "Iphone"},function (err, product) {
                if (err)  res.status(status.INTERNAL_SERVER_ERROR).json(err.message);
                res.json(product);
            })

        })

    })

    //==================TODO to be deleted=====================
    router.get("/users",function (req, res) {
        wagner.invoke(function (User) {
            User.findOne({}).populate("data.cart.product").exec(function (err, users) {
                if(err)console.log(err)
                res.send(users);
            })
        })
    })
}


