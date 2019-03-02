const chai = require("chai");
require("dotenv").config();

const { assert } = chai;

suite("Unit Tests", () => {
    suite("Basic Assertions", () => {
        test("#isNull, #isNotNull", () => {
            // assert.fail();// Always fails
            assert.isNull(null, "null is null");
            assert.isNotNull(1, "1 is not null");
        });

        test("#isDefined, #isUndefined", () => {
            assert.isDefined(null, "null is not undefined");
            assert.isUndefined(undefined, "undefined is undefined");
            assert.isDefined("hello", "string is not undefined");
        });

        test("#isOk, #isNotOk", () => {
            assert.isNotOk(null, "null is falsey");
            assert.isOk("I'm truthy", "string is truthy");
            assert.isOk(true, "true is truthy");
        });

        test("#isTrue, #isNotTrue, #isFalse, #isNotFalse", () => {
            assert.isTrue(true, "true is true");
            assert.isTrue(!!"double negation", "double negation of something truthy is true");
            assert.isNotTrue({ value: "truthy" }, "a truthy object is NOT TRUE nor FALSE");
            assert.isFalse(false, "false is false");
            assert.isNotFalse({ value: "truthy" }, "a truthy object is NOT TRUE nor FALSE");
        });
    });

    suite("Equality", () => {
        test("#equal, #notEqual", () => {
            assert.equal(12, "12", "numbers are coerced into strings with ==");
            assert.notEqual({ value: 1 }, { value: 1 }, "== compares object references");
            assert.equal(6 * "2", "12", "6 * '2' == '12'");
            assert.notEqual(6 + "2", "12", "6 + '2' == '62'");
        });

        test("#strictEqual, #notStrictEqual", () => {
            assert.notStrictEqual(6, "6");
            assert.strictEqual(6, 3 * 2);
            assert.strictEqual(6 * "2", 12);
            assert.notStrictEqual([1, "a", {}], [1, "a", {}]);
        });

        test("#deepEqual, #notDeepEqual", () => {
            assert.deepEqual({ a: "1", b: 5 }, { b: 5, a: "1" }, "keys order doesn't matter");
            assert.notDeepEqual({ a: [5, 6] }, { a: [6, 5] }, "array elements position does matter");
        });
    });

    suite("Comparisons", () => {
        test("#isAbove, #isAtMost", () => {
            assert.isAtMost("hello".length, 5);
            assert.isAbove(1, 0);
            assert.isAbove(Math.PI, 3);
            assert.isAtMost(1 - Math.random(), 1);
        });

        test("#isBelow, #isAtLeast", () => {
            assert.isAtLeast("world".length, 5);
            assert.isAtLeast(2 * Math.random(), 0);
            assert.isBelow(5 % 2, 2);
            assert.isBelow(2 / 3, 1);
        });

        test("#approximately", () => {
            const weirdNumbers = delta => 1 + delta - Math.random();// 0 <= Math.random() < 1
            assert.approximately(weirdNumbers(0.5), 1, 0.5);// .approximately(actual, expected, range, [message]), actual = expected +/- range
            assert.approximately(weirdNumbers(0.2), 1, 0.8);
        });
    });

    suite("Arrays", () => {
        test("#isArray, #isNotArray", () => {
            assert.isArray("isThisAnArray?".split(""), "String.prototype.split() returns an Array");
            assert.isNotArray([1, 2, 3].indexOf(2), "indexOf returns a number");
        });

        test("Array #include, #notInclude", () => {
            const winterMonths = ["dec,", "jan", "feb", "mar"];
            const backendLanguages = ["php", "python", "javascript", "ruby", "asp"];
            assert.notInclude(winterMonths, "jul", "jul is not present in winterMonths array");
            assert.include(backendLanguages, "javascript", "javascript is present in backendLanguages array");
        });
    });

    suite("Strings", () => {
        test("#isString, #isNotString", () => {
            assert.isNotString(Math.sin(Math.PI / 4), "a float is not a string");
            assert.isString(process.env.FAKE_PATH, "env vars are strings (or undefined)");
            assert.isString(JSON.stringify({ type: "object" }), "a JSON is a string");
        });

        test("String #include, #notInclude", () => {
            assert.include("Arrow", "row", "Arrow contains row");
            assert.notInclude("dart", "queue", "dart doesn't contain queue");
        });

        test("#match, #notMatch", function () {
            const formatPeople = (name, age) => "# name: " + name + ", age: " + age + "\n";
            const regex = /^#\sname:\s[\w\s]+,\sage:\s\d+\s?$/;
            assert.match(formatPeople("John Doe", 35), regex);
            assert.notMatch(formatPeople("Paul Smith III", "twenty-four"), regex);
        });
    });

    suite("Objects", () => {
        class Car {
            constructor() {
                this.model = "cedan";
                this.engines = 1;
                this.wheels = 4;
            }
        }

        class Plane {
            constructor() {
                this.model = "737";
                this.engines = ["left", "right"];
                this.wheels = 6;
                this.wings = 2;
            }
        }

        const myCar = new Car();
        const airlinePlane = new Plane();

        test("#property, #notProperty", () => {
            assert.notProperty(myCar, "wings", "myCar does not include wings");
            assert.property(airlinePlane, "engines", "airlinePlane includes engines");
            assert.property(myCar, "wheels", "myCar includes wheels");
        });

        test("#typeOf, #notTypeOf", () => {
            assert.typeOf(myCar, "object");
            assert.typeOf(myCar.model, "string");
            assert.notTypeOf(airlinePlane.wings, "string");
            assert.typeOf(airlinePlane.engines, "array");
            assert.typeOf(myCar.wheels, "number");
        });

        test("#instanceOf, #notInstanceOf", () => {
            assert.notInstanceOf(myCar, Plane);
            assert.instanceOf(airlinePlane, Plane);
            assert.instanceOf(airlinePlane, Object, "everything is an Object");
            assert.notInstanceOf(myCar.wheels, String);
        });
    });
});
