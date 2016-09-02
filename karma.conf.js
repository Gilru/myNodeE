module.exports = function(config) {
    config.set({
        files: [
            "https://ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular.min.js",
            "https://ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular-mocks.js",
            "View/Directive/loginUser.js",
            "Test/viewTest.js"

        ],
        frameworks: ["mocha","chai"],
        browsers: ['Chrome'],
        proxies: {
            "/": "http://localhost:3000/"
        }


    });
};