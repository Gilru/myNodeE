const server = require("./Setup/server")
const app = server();
const api = require("./api");
const wagner = require("wagner-core")
const bodyParser = require("body-parser");
require("./Setup/env")
require("./Setup/authSetup")(app);
require("./View/index")(app)

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static("View"))


api(app);
app.listen(3000, function () {
    console.log(" Server is listening at port 3000");
})


