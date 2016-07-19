const request = require("superagent");
const assert = require("assert");

const url = {
    Electronic : "http://localhost:3000/api/v1/category/parent/Electronic",
    Product: ""

}


describe("Category", function () {
    it("/api/v1/category/parent/Electronic should return Json file", function (done) {
        request.get(url.Electronic).end(function (err, res) {

           var category = JSON.parse(res.text);
            assert("Iphone",category._id);
            assert("Electronic",category.parent);
            done();
        })


    })
})

describe("Product", function () {
    it("/api/v1/product/id/:id should return Json file", function (done) {
        request.get(url.Product).end(function (err, res) {

            var product = JSON.parse(res.text);
            assert("Iphone",product._id);
            assert("Electronic",product.price.amount);
            done();
        })


    })
})


