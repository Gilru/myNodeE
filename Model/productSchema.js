// name, pictures,price[amount,currency],category
var mongoose = require("mongoose");
var Category = require("./categorySchema")
var fx = require("./exchange")
var Schema = mongoose.Schema;


var productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    picture: [{
        type: String,
        match: /^http:\/\//i

    }],
    price: {
        amount: {
            type: Number,
            required: true,
            set: function (v) {

                this.internal.approxAmountInUSD = v / fx()[this.price.currency];


                return v;
            }
        },
        currency: {
            type: String,
            enum: ['USD', 'CAD', 'EUR'],
            require: true

        }
    },
    internal: {
        approxAmountInUSD: {
            type: Number
        }
    },
    category: Category.categorySchema

})

productSchema.index({name: "text"})

var schema = productSchema;
var currencyToSymbol = {
    "USD": "$",
    "CAD": "$",
    "EUR": "€"
}

schema.virtual("displayPrice").get(function () {

    return currencyToSymbol[this.price.currency] + "" + this.price.amount;

})

schema.set("toJSON",{virtuals: true})
schema.set("toObject",{virtuals: true})










// console.log(require("util").inspect(productSchema));
module.exports = schema;

module.exports.productSchema = productSchema