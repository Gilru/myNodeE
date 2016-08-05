const request = require("superagent");
const ONEHOUR = 3600000;
var currency = {
    "USD": 1,
    "EUR": 1.1,
    "CAD": 1.2
}




module.exports = function () {
    console.log(JSON.stringify(currency))
    updateCurrency(process.env.EXHANGEAPIKEY);
    setInterval(updateCurrency,ONEHOUR);

    return  currency;
}

function updateCurrency(apiKey) {
    request.get("https://openexchangerates.org/api/latest.json")
        .query({app_id: apiKey})
        .end(function (err, res) {
            if (err)return console.log(err)


            currency["USD"] = res.body.rates["USD"];
            currency["EUR"] = res.body.rates["EUR"];
            currency["CAD"] = res.body.rates["CAD"];
            console.log(JSON.stringify(currency))

        })
}