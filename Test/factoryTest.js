const assert = require("assert");
const wagner = require("wagner-core")
const factory = require("../Setup/factory")(wagner);
var product;
var cat;
before(deleteEverything)

describe("Category", function () {
    it("should create a new Category and Save it", function (done) {
        wagner.invoke(function (Category) {
            cat = new Category({
                _id: "Iphone",
                parent: "Electronic"

            })

            assert.equal(cat._id, "Iphone");
            assert.equal(cat.parent, "Electronic");

            cat.save(function (err, cat) {
                Category.findOne({_id: "Iphone"}, function (err, cat) {
                    if (err) assert.ifError(err);
                    assert.equal(cat._id, "Iphone")
                    assert.equal(cat.parent, "Electronic")
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
                    amount: 15,
                    currency: "EUR"
                },
                category: cat


            })

            assert.equal(product.name, "Iphone");
            assert.equal(product.price.amount, 15);
            assert.equal(product.displayPrice, "€15");

            product.save(function (err, cat) {
                Product.findOne({name: "Iphone"}, function (err, cat) {
                    if (err) assert.ifError(err);
                    assert.equal(product.name, "Iphone");
                    assert.equal(product.price.amount, 15);
                    assert.equal(product.displayPrice, "€15");
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
                    username: "Gilbert",
                    email: "example@email.com"
                },
                data: {
                    cart: {
                        product: product._id
                    }
                }


            })

            assert.equal(user.profile.username, "gilbert");
            assert.equal(user.profile.email, "example@email.com");

            user.save(function (err, cat) {

                User.findOne({username: "gil"}).populate("data.cart.product").exec(function (err, users) {
                    if (err)console.log(err)

                    assert.equal(user.profile.username, "gilbert")
                    assert.equal(user.profile.email, "example@email.com")
                    assert.equal(user.data.cart[0].product, product._id)
                    done();
                })


            })


        });

    })
})


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



