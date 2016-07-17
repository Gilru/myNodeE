var mongoose = require("mongoose");
var Schema = mongoose.Schema;


module.exports = new Schema({
    profile: {
        username: {
            type: String,
            required: true,
            lowercase: true
        },
        picture: {
            type: String,
            required: false,
            match: /^http:\/\//i
        },
        email: {
            type: String,
            required: true,
            match: /.+@.+\..+/,
            lowercase: true

        },
        loginCount: {
            type: Number,
            required: false,
            default: 0
        }
    },
    data: {
        oauth: {
            type: String,
            required: false
        },

        cart: [{
            product: {
                type: Schema.Types.ObjectId,
                ref: "Product"
            },
            quantity: {
                type: Number,
                default: 1,
                min: 1
            }

        }]
    }


})