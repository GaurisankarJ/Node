const expect = require("expect");
const rewire = require("rewire");

var app = rewire("./app.js");//Used to mock out various data inside the app

describe("App", () => {
    var db = {
        saveUser: expect.createSpy()
    };
    app.__set__("db", db);//app.__get__

    it("should call the spy corretly", () => {
        var spy = expect.createSpy();
        spy("Sankar", 22);
        expect(spy).toHaveBeenCalled().toHaveBeenCalledWith("Sankar", 22);
    });

    it("should call saveUser with user object", () => {
        var email = "sankar@example.com";
        var password = "1234abc";

        app.handleSignup(email, password);
        expect(db.saveUser).toHaveBeenCalledWith({email, password});
    });
});
