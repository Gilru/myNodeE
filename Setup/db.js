
var mongoose = require('mongoose');

module.exports.connect = function () {

    mongoose.connect('mongodb://localhost/test');
    return mongoose;
}
module.exports.mongoose = mongoose;

//
// module.exports.Category = function (wagner) {
//     wagner.factory("Category",function () {
//         return Category;
//     })
// }




