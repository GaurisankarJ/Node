const chai = require("chai");
const chaiHttp = require("chai-http");
const Browser = require("zombie");

const { assert } = chai;
const server = require("../server.js");

chai.use(chaiHttp);

suite("Functional Tests", () => {
    test("Asynchronous Test #example", (done) => {
        setTimeout(() => {
            assert.isOk("Async test !!");
            done();
        }, 500);
    });

    suite("Integration tests with chai-http", () => {
        suite("GET /hello?name=[name] => 'hello [name]'", () => {
            test("#example - ?name=John", (done) => {
                chai.request(server)
                    .get("/hello?name=John")
                    .end((err, res) => {
                        assert.equal(res.status, 200, "response status should be 200");
                        assert.equal(res.text, "hello John", "response should be 'hello John'");
                        done();
                    });
            });

            test("Test GET /hello with no name", (done) => {
                chai.request(server)
                    .get("/hello")
                    .end((err, res) => {
                        assert.equal(res.status, 200);
                        assert.equal(res.text, "hello Guest");
                        done();
                    });
            });

            test("Test GET /hello with your name", (done) => {
                chai.request(server)
                    .get("/hello?name=Sankar")
                    .end((err, res) => {
                        assert.equal(res.status, 200);
                        assert.equal(res.text, "hello Sankar");
                        done();
                    });
            });
        });

        suite("PUT /travellers", () => {
            test("Responds with appropriate JSON data when sending {surname: 'Polo'}", (done) => {
                chai.request(server)
                    .put("/travellers")
                    .send({ surname: "Polo" })
                    .end((err, res) => {
                        assert.equal(res.status, 200, "response status should be 200");
                        assert.equal(res.type, "application/json", "Response should be json");
                        assert.equal(res.body.name, "Marco", "res.body.name should be 'Marco'");
                        assert.equal(res.body.surname, "Polo", "res.body.surname should be 'Polo'");
                        done();
                    });
            });

            test("Responds with appropriate JSON data when sending {surname: 'Colombo'}", (done) => {
                chai.request(server)
                    .put("/travellers")
                    .send({ surname: "Colombo" })
                    .end((err, res) => {
                        assert.equal(res.status, 200, "response status should be 200");
                        assert.equal(res.type, "application/json", "Response should be json");
                        assert.equal(res.body.name, "Cristoforo", "res.body.name should be 'Cristoforo'");
                        assert.equal(res.body.surname, "Colombo", "res.body.surname should be 'Colombo'");
                        done();
                    });
            });

            test("send {surname: 'da Verrazzano'}", function (done) {
                chai.request(server)
                    .put("/travellers")
                    .send({ surname: "da Verrazzano" })
                    .end((err, res) => {
                        assert.equal(res.status, 200, "response status should be 200");
                        assert.equal(res.type, "application/json", "Response should be json");
                        assert.equal(res.body.name, "Giovanni", "res.body.name should be 'Giovanni'");
                        assert.equal(res.body.surname, "da Verrazzano", "res.body.surname should be 'da Verrazzano'");
                        done();
                    });
            });
        });
    });
});

// Browser.site = "http://localhost:4001/";
Browser.localhost("example.com", 4001);

suite("Testing with Zombie.js", () => {
    const browser = new Browser();

    suiteSetup((done) => {
        browser.visit("/", done);
    });

    suite("'Famous Italian Explorers' form", () => {
        test("submit the input 'surname' : 'Polo'", (done) => {
            // Filling a input field with name as "surname"
            browser.fill("surname", "Polo");
            // Clicking a button of type "submit"
            browser.pressButton("submit", () => {
                // Asserting if successfully loaded
                browser.assert.success();
                // Asserting the equality of the text of an element
                browser.assert.text("span#name", "Marco");
                browser.assert.text("span#surname", "Polo");
                // Asserting whether an element exits
                browser.assert.element("span#dates", 1);
                done();
            });
        });

        test("submit the input 'surname' : 'Colombo'", (done) => {
            browser.fill("surname", "Colombo");
            browser.pressButton("submit", () => {
                browser.assert.success();
                browser.assert.text("span#name", "Cristoforo");
                browser.assert.text("span#surname", "Colombo");
                browser.assert.elements("span#dates", 1, "only one element should be present");
                done();
            });
        });

        test("submit 'surname' : 'Vespucci'", (done) => {
            browser.fill("surname", "Vespucci");
            browser.pressButton("submit", () => {
                browser.assert.success();
                browser.assert.text("span#name", "Amerigo");
                browser.assert.text("span#surname", "Vespucci");
                browser.assert.element("span#dates", 1);
                done();
            });
        });
    });
});
