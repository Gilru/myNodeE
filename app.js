const server = require("./Setup/server")
const app = server();
const api = require("./api");
const wagner = require("wagner-core")
const bodyParser = require("body-parser");
require("./Setup/authSetup")(app);
require("./View/index")(app)


api(app);
app.listen(3000, function () {
    console.log(" Server is listening at port 3000");
})


