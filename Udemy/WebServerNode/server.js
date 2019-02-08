const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

const port = process.env.PORT || 3001;//For heroku
const app = express();

hbs.registerPartials(__dirname + "/views/partials");//To use partials while templating
hbs.registerHelper("getCurrentYear", () => {
    return new Date().getFullYear();
});//To use helper functions while templating
hbs.registerHelper("screamIt", (text) => {
    return text.toUpperCase();
});

app.set("view engine", "hbs");//To set hbs as templating engine
//Using middleware
// app.use((req, res, next) => {
//     res.render("maintenance.hbs", {
//         welcomeMessage: "We'll be right back....."
//     });
// });//Handlers for the rest of the requests won't fire
app.use(express.static(__dirname + "/public"));//Using static assets
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile("server.log", log + "\n", (err) => {
        if(err) {
            console.log(err);
        }
    });
    console.log(log);
    next();
});

app.get("/", (req, res) => {
    //res.send("Hello Express!");
    res.render("home.hbs", {
        pageTitle: "Welcome Page",
        welcomeMessage: "Welcome to my website"
    });
});

app.get("/about", (req, res) => {
    res.render("about.hbs", {
        pageTitle: "About Page"
    });//To render hbs file
});

var listener = app.listen(port, () => {
    console.log(`Server listening on port ${listener.address().port}!`);
});