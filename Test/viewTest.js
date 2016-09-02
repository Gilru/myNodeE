var element;
var httpBackend;
var compiler;
var scope

beforeEach(function () {
    var $injector = angular.injector(['myApp', 'ngMockE2E']);


    $injector.invoke(function ($rootScope, $compile, $httpBackend) {
        scope =  $rootScope.$new();
        httpBackend = $httpBackend;
        compiler = $compile;
        // element = $compile('<user-login></user-login>')(root)
        // root.$digest();
        // console.log(element)


    })

})


describe("user login", function () {
    it("it should show the login user", function (done) {
        httpBackend.expectGET("api/v1/user").respond({
            "profile": {
                "username": "Gil The Best",
                "email": "example.email.com"
            }
        })


        element = compiler('<user-login></user-login>')(scope);
        scope.$digest();
        httpBackend.flush();
       var  $userAccount = element.find("h1")[0].textContent;


        assert.equal($userAccount, "hello Gil The Best (example.email.com)")
        done();


    })
})
