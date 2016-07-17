const assert = require("assert");
const wagner = require("wagner-core")
const factory = require("../Setup/factory")(wagner);
beforeEach(deleteEverything)

describe("Category", function () {
    it("should create a new Category and Save it", function (done) {
        wagner.invoke(function (Category) {
            var cat = new Category({
                _id: "Iphone",
                parent: "Electronics"

            })

            assert.equal(cat._id, "Iphone");
            assert.equal(cat.parent, "Electronics");

            cat.save(function (err, cat) {
                Category.findOne({_id: "Iphone"}, function (err, cat) {
                    if (err) assert.ifError(err);
                    assert.equal(cat._id, "Iphone")
                    assert.equal(cat.parent, "Electronics")
                    done();
                })
            })


        });

    })
})


//TODO describe User,product

describe("User", function () {
    it("should create a new User and Save it", function (done) {

        wagner.invoke(function (User) {
            var user = new User({
                profile: {
                    username: "gil",
                    email: "example@email.com"
                }


            })

            assert.equal(user.profile.username, "gil");
            assert.equal(user.profile.email, "example@email.com");

            user.save(function (err, cat) {
                User.findOne({username: "gil"}, function (err, cat) {
                    if (err) assert.ifError(err);
                    assert.equal(user.profile.username, "gil")
                    assert.equal(user.profile.email, "example@email.com")
                    done();
                })
            })


        });

    })
})


describe("Product", function () {
    it("should create a new User and Save it", function (done) {
        wagner.invoke(function (Product) {
            var product = new Product({
                name: "Iphone",
                price: {
                    amount: 23,
                    currency: "USD"
                },


            })

            assert.equal(product.name, "Iphone");
            assert.equal(product.price.amount, 23);
            assert.equal(product.displayPrice, "$23");

            product.save(function (err, cat) {
                Product.findOne({name: "Iphone"}, function (err, cat) {
                    if (err) assert.ifError(err);
                    assert.equal(product.name, "Iphone");
                    assert.equal(product.price.amount, 23);
                    assert.equal(product.displayPrice, "$23");
                    done();
                })
            })


        });
    })
})

after(deleteEverything)




function deleteEverything () {
    //TODO: use an array to shorter the code

    wagner.invoke(function (Category) {
        Category.remove({}).exec(function () {


        })
    })

    wagner.invoke(function (User) {
        User.remove({}).exec(function () {


        })
    })

    wagner.invoke(function (Product) {
        Product.remove({}).exec(function () {


        })
    })
}



