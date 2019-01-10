// var square = (x) => {
//     var result = x * x;
//     return result;
// };
var square = x => x * x;
console.log(square(9));

var user = {
    name: "Sankar",
    //Arrow function
    sayHi: () => {
        console.log(arguments);//Global
        console.log(`Hi. I am ${this.name}`);//Arrow function does not bind a this keyword
    },
    //Regular function
    sayHiAlt() {
        console.log(arguments);
        console.log(`Hi. I am ${this.name}`);
    }
};
user.sayHi(1, 2, 3);
user.sayHiAlt(1, 2, 3);