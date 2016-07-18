// const mongoose = require("mongoose");
// const userSchema = require("./userSchema");
    const server = require("./Setup/server")
    const app = server();
    const api = require("./api");
    const wagner = require("wagner-core")
// const productSchema = require("./productSchema");
// const categorySchema = require("./categorySchema");
// mongoose.connect('mongodb://localhost/test');
//
// const Product = mongoose.model("Product",productSchema);
// const Category = mongoose.model("Categore",categorySchema);
//
// var cat = new Category({
//     _id: "Android",
//     parent: "Phone",
//     ancestor: ["Electronic","wacth"]
// })
// var p = new Product({
//     name: "car",
//     price: {
//         amount: 23,
//         currency: "USD"
//     },
//     category: cat
//
// })
//
// p.save(function (err,docs) {
//     if (err) console.log(err)
//     // console.log(docs)
//     console.log("docs successfully saved")
// })
//
// Product.find({"category.ancestor" : "Electronic"},function(err,doc) {
//     console.log(doc + " we just log out")
// })


api(app);
app.listen(3000,function () {
    console.log(" Server is listening at port 3000");
})














//name ,email,login count