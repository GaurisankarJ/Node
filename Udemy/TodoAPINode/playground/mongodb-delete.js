const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodosApp", (err, client) => {
    if(err) {
        return console.log("Unable to connect to MongoDB server!", err);
    }
    console.log("Connected to MongoDB server!");
    const db = client.db("TodoApp");

    //deleteMany
    db.collection("Todos").deleteMany({ text: "Eat lunch" }).then((result) => {
        console.log(result);
    });

    //deleteOne
    db.collection("Todos").deleteOne({ completed: false }).then((result) => {
        console.log(result);
    });

    //findOneAndDelete
    db.collection("Todos").findOneAndDelete({ text: "Walk the dog" }).then((result) => {
        console.log(result);
    });

    client.close();
});