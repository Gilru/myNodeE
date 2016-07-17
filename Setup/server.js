const express = require("express");

module.exports = function () {
    const app = express();
    app.get("/",function (req, res) {
        res.send("Hello world")
    })

    app.get("/user/:user",function (req, res) {
        console.log("Username is " +JSON.stringify(req.params)  + " the option is " + JSON.stringify(req.query))
        res.send("Username is " + JSON.stringify(req.params) + " the option is " + JSON.stringify(req.query))
    })

    return app;f
}


