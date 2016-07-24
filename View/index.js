module.exports = function (app) {
    app.get("/",function (req,res) {
        if (!req.user)
        res.send("<a href='/auth/facebook'>Login with Facebook</a>");
        else
            res.send("Welcome " + req.user.profile.username);
    })
}