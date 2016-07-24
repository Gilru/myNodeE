const categorySchema = require("../Model/categorySchema");
const userSchema = require("../Model/userSchema");
const productSchema = require("../Model/productSchema");
// const wagner = require("wagner-core");
const db = require("./db");

var mongoose = db.connect();

//TODO use _.each to loop
var Category = mongoose.model("Category", categorySchema);
var User = mongoose.model("User", userSchema);
var Product = mongoose.model("Product", productSchema);


module.exports = function (wagner) {
    wagner.factory("Category", function () {
        return Category;
    })


    wagner.factory("User", function () {
        return User;
    })
    wagner.factory("Product", function () {
        return Product;
    })

}









