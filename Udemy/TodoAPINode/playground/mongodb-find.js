const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodosApp", (err, client) => {
    if(err) {
        return console.log("Unable to connect to MongoDB server!", err);
    }
    console.log("Connected to MongoDB server!");
    const db = client.db("TodoApp");

    db.collection("Todos").find().toArray().then((docs) => {
        console.log("Todos");
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log("Unable to fetch todos!", err);
    });

    db.collection("Todos").find({ completed: false }).toArray().then((docs) => {
        console.log("Todos Pending");
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log("Unable to fetch todos!", err);
    });

    db.collection("Todos").find({ 
        _id: new ObjectID("5c3ceecb1bf47285868a5329")
    }).toArray().then((docs) => {
        console.log("Query by ID");
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log("Unable to fetch todos!", err);
    });

    db.collection("Todos").find().count().then((count) => {
        console.log("Todos Count");
        console.log(count);
    }, (err) => {
        console.log("Unable to fetch todos!", err);
    });

    client.close();
});