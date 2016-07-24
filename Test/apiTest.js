const request = require("superagent");
const assert = require("assert");

const url = {
    Electronic: "http://localhost:3000/api/v1/parent/Electronic",
    Product: "http://localhost:3000/api/v1/product/id/",
    allProduct: "http://localhost:3000/api/v1/products",
    categoryU: "http://localhost:3000/api/v1/product/category/Iphone"

}


describe("Category", function () {
    it("/api/v1/category/parent/Electronic should return Json file", function (done) {
        request.get(url.Electronic).end(function (err, res) {

            var category = JSON.parse(res.text)[0];



            assert.equal(category._id, "Iphone");
            assert.equal(category.parent, "Electronic");
            done();
        })


    })
})

describe("Product", function () {
    it("/api/v1/product/id/:id should return Json file", function (done) {
        request.get(url.allProduct).end(function (err, res) {

            var product = JSON.parse(res.text)[0];
            var productID = product._id;
            var newUrl = url.Product + productID
            request.get(newUrl).end(function (err, res) {
                var product = JSON.parse(res.text)[0];
                assert.equal(product.category.parent, "Electronic");
                assert.equal(product.category._id, "Iphone");
                done();
            })



        })


    })

    it("/products should return a/product/category/:id a json file", function (done) {
        request.get(url.categoryU).end(function (err, res) {

            var product = JSON.parse(res.text)[0];
            console.log(product)
            assert.equal(product.category.parent, "Electronic");
            assert.equal(product.category._id, "Iphone");
            done();
        })


    })

    it("/products should return all products Json file", function (done) {
        request.get(url.allProduct).end(function (err, res) {

            var product = JSON.parse(res.text)[0];
            assert.equal(product.category.parent, "Electronic");
            assert.equal(product.category._id, "Iphone");

            done();
        })


    })


})


