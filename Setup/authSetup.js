var passport = require("passport"),
    FacebookStrategy = require("passport-facebook").Strategy;
// var express = require("express")
var session = require("express-session")
const wagner = require("wagner-core");
require("./factory")(wagner);
const ObjectId = require('mongoose').Types.ObjectId;


module.exports = function (app) {
    //middleware
    app.use(session({
        secret: 'keyboard cat',
        resave: true,
        saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());


    //SERIALIZE DESERIALIZE USER
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        wagner.invoke(function (User) {
            // User.findOne({_id : id}, function(err, user) {
            //     done(err, user);
            // });
            User.findOne({_id: id}).populate("data.cart.product").exec(function (err, user) {
                // console.log(user.data.cart)
                done(err, user);
            });
        })

    });
    //ROUTE
    app.get("/auth/facebook", passport.authenticate('facebook', {
        scope: ["email"]
    }))
    app.get("/auth/facebook/callback", passport.authenticate("facebook",
        {
            successRedirect: "/",
            failureRedirect: "/fails"
        }))
    //FACEBOOK SETUP
    passport.use(new FacebookStrategy({
        clientID: process.env.CLIENTID,
        clientSecret: process.env.CLIENTSECRET,
        callbackURL: "http://localhost:3000/auth/facebook/callback"
    }, function (accessToken, refreshToken, profile, done) {
        // console.log(profile)

        var options = {
            new: true,
            upsert: true,
            runValidators: true
        }
        wagner.invoke(function (User) {
            User.findOneAndUpdate({"data.oauth": profile.id}, {
                    $set: {
                        "profile.username": profile.displayName,
                        "profile.email": "exampl@email.com",
                        "data.oauth": profile.id
                    }
                },
                options, function (err, user) {
                    if (err) return done(err)
                    done(null, user);
                })
        })


    }))

    /*
     * { id: '130507380719540',
     username: undefined,
     displayName: 'Frisker Fritz',
     name:
     { familyName: undefined,
     givenName: undefined,
     middleName: undefined },
     gender: undefined,
     profileUrl: undefined,
     provider: 'facebook',
     _raw: '{"name":"Frisker Fritz","id":"130507380719540"}',
     _json: { name: 'Frisker Fritz', id: '130507380719540' } }*/
}