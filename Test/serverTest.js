const app = require("./server");
const request = require("superagent");
const assert = require("assert");
const http = require("http");



before(function () {
    app().listen(3000, function () {
        console.log(" the app is running ")
    })
})

describe("Server", function () {
    it("should respond with a status of 200", function (done) {
        request.get("http://localhost:3000/").end(function (err, res) {
            if (err) console.log(err)

            assert.equal(res.statusCode, 200);
            done();

        })


    })


    it("should log Hello World in terminal", function (done) {
        request.get("http://localhost:3000/").end(function (err, res) {
            if (err) console.log(err)
            assert.equal(res.text, "Hello world")
            done();

        })

    })
})





