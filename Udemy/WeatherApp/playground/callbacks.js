var getUser = (id, callback) => {
    var user = {
        id: id,
        name: "Sankar"
    };
    setTimeout(() => {
        callback(user);
    }, 2000);
};

getUser(32, (userObject) => {
    console.log(userObject);
});