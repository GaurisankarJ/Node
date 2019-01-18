const request = require("supertest");//For express applications
const expect = require("expect");

const app = require("./server").app;

describe("Server", () => {
    it("should return hello world response", (done) => {
        request(app)
            .get("/")
            .expect(200)
            .expect("Hello World!")
            .end(done);
    });
    describe("GET /user", () => {
        it("should return page not found response", (done) => {
            request(app)
                .get("/user")
                .expect(404)
                .expect((res) => {
                    expect(res.body).toInclude({
                        error: "Page not found."
                    });
                })
                .end(done);
        });
    });
    describe("GET /users", () => {
        it("should return return my user object", (done) => {
            request(app)
                .get("/users")
                .expect(200)
                .expect((res) => {
                    expect(res.body).toInclude({
                        name: "Sankar",
                        age: 22
                    });
                })
                .end(done);
        });
    });
});
