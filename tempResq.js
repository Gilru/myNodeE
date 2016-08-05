var request = require("superagent");

request.post("http://localhost:3000/api/v1/me/cart").send({ cart: [

]}).end();