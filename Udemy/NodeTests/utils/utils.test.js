const expect = require("expect");
const utils = require("./utils");

describe("Utils", () => {
    describe("#add", () => {
        it("should add two numbers", () => {
            var res = utils.add(12, 33);
            // if(res != 45) {
            //     throw new Error(`Expected 45 but got ${res}.`);
            // }
            expect(res).toExist().toBe(45).toBeA("number");
        });

        //Asynchronous testing, done is is used as an argument
        it("should async add tow numbers", (done) => {
            utils.asyncAdd(5, 7, (sum) => {
                expect(sum).toBeA("number").toBe(12);
                done();
            });
        });
    });
    describe("#square", () => {
        it("should square two numbers", () => {
            var res = utils.square(3);
            // if(res != 9) {
            //     throw new Error(`Expected 9 but got ${res}.`);
            // }
            expect(res).toBe(9).toBeA("number");
        });

        //Asynchronous testing
        it("should async square tow numbers", (done) => {
            utils.asyncSquare(5, (square) => {
                expect(square).toBeA("number").toBe(25);
                done();//Error: Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called.
            });
        });
    });
});
 
// it("should expect some value", () => {
//     expect(12).toNotBe(13);
//     // expect({ name: "Sankar" }).toBe({ name: "Sankar" });//Will throw error
//     expect({ name: "Sankar" }).toEqual({ name: "Sankar" });
//     expect({ name: "Sankar" }).toNotEqual({ name: "NotSankar" });
//     expect([1, 2, 3, 5]).toExclude(4);
//     expect({
//         name: "Sankar",
//         age: 23
//     }).toInclude({
//         name: "Sankar"
//     });
// });

it("should set firstName and lastName", () => {
    var user = {
        age: 22,
        location: "Kochi"
    };
    var res = utils.setName(user, "Sankar J");
    expect(res).toExist();
    expect(res).toEqual(user);//JavaScript objects are passed by reference
    expect(user.firstName).toBe("Sankar");
    expect(user.lastName).toBe("J");
    expect(user).toInclude({ firstName: "Sankar" , lastName: "J"});
});