const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const port = process.env.PORT || 4001;
const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/index.html"));
});


app.get("/hello", (req, res) => {
    const name = req.query.name || "Guest";
    res.type("txt").send("hello " + name);
});

const travellers = (req, res) => {
    let data = {};
    if (req.body && req.body.surname) {
        switch (req.body.surname.toLowerCase()) {
        case "polo":
            data = {
                name: "Marco",
                surname: "Polo",
                dates: "1254 - 1324"
            };
            break;
        case "colombo":
            data = {
                name: "Cristoforo",
                surname: "Colombo",
                dates: "1451 - 1506"
            };
            break;
        case "vespucci":
            data = {
                name: "Amerigo",
                surname: "Vespucci",
                dates: "1454 - 1512"
            };
            break;
        case "da verrazzano":
        case "verrazzano":
            data = {
                name: "Giovanni",
                surname: "da Verrazzano",
                dates: "1485 - 1528"
            };
            break;
        default:
            data = {
                name: "unknown"
            };
        }
    }
    res.json(data);
};

app.route("/travellers")
    .put(travellers);

app.listen(port, () => {
    console.log("Listening on port " + port);
});

module.exports = app;
