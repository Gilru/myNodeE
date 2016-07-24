const assert = require("assert");
const wagner = require("wagner-core")
const factory = require("../Setup/factory")(wagner);
var product;
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
describe("Product", function () {
    it("should create a new User and Save it", function (done) {
        wagner.invoke(function (Product) {
            product = new Product({
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

//TODO describe User,product

describe("User", function () {
    it("should create a new User and Save it", function (done) {

        wagner.invoke(function (User) {
            console.log(product._id)
            var user = new User({
                profile: {
                    username: "gil",
                    email: "example@email.com"
                },
                data: {
                    cart: {
                        product: product._id
                    }
                }


            })

            assert.equal(user.profile.username, "gil");
            assert.equal(user.profile.email, "example@email.com");

            user.save(function (err, cat) {

                User.findOne({username: "gil"}).populate("data.cart.product").exec(function (err, users) {
                    if (err)console.log(err)

                    assert.equal(user.profile.username, "gil")
                    assert.equal(user.profile.email, "example@email.com")
                    assert.equal(user.data.cart[0].product, product._id)
                    done();
                })


            })


        });

    })
})


after(deleteEverything)


function deleteEverything() {
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



