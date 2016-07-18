express = require("express");
wagner = require("wagner-core");
require("./Setup/factory")(wagner);


module.exports = function(app) {

    var router = express.Router();
    app.use("/api/v1/category",router)



    router.get("/parent/:parentValue",function (req, res) {
        wagner.invoke(function (Category) {

        })
    })
}


