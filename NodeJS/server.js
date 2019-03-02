const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
require("dotenv").config();
const mongo = require("mongodb");
// Requiring Express-Session
const session = require("express-session");
// Requiring Passport
const passport = require("passport");
// Requiring Passport-Local
const LocalStrategy = require("passport-local");
// Requiring BCrypt
const bcrypt = require("bcrypt");

const port = 5000;
const app = express();

app.use(express.static(path.join(__dirname, "/public")));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Using Express-Session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));
// Using Passport
app.use(passport.initialize());
app.use(passport.session());
// Setting the view-engine as Pug
app.set("view engine", "pug");

// MongoDB
const url = process.env.MONGODB_URL;
const dbName = process.env.DB_NAME;
mongo.MongoClient.connect(url, (err, client) => {
    if (err) {
        return console.log("Cannot connect to server!!");
    }
    console.log("Connected successfully to server!!");

    const db = client.db(dbName);

    // Serialize user object
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    // Deserialize user
    passport.deserializeUser((id, done) => {
        db.collection("users").findOne(
            { _id: new mongo.ObjectID(id) },
            (e, doc) => {
                done(null, doc);
            }
        );
    });

    passport.use(new LocalStrategy((username, password, done) => {
        db.collection("users").findOne({ username }, (error, user) => {
            console.log("User Login Log: " + username + " attempted to log in.");
            if (error) {
                return done(err);
            }
            if (!user) {
                return done(null, false);
            }
            if (!bcrypt.compareSync(password, user.password)) {
                return done(null, false);
            }
            return done(null, user);
        });
    }));

    // Ensure Authentication
    const ensureAuthenticated = (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect("/");
    };

    // Register User
    const registerUser = (req, res, next) => {
        db.collection("users").findOne({ username: req.body.username }, (error, user) => {
            if (error) {
                next(error);
            } else if (user) {
                res.redirect("/");
            } else {
                const hash = bcrypt.hashSync(req.body.password, 12);
                db.collection("users").insertOne(
                    {
                        username: req.body.username,
                        password: hash
                    },
                    (e, doc) => {
                        if (e) {
                            res.redirect("/");
                        } else {
                            next(null, user);
                        }
                    }
                );
            }
        });
    };

    app.get("/", (req, res) => {
        res.render(path.join(__dirname, "/views/pug/index"), { title: "Home Page", message: "Please login", showLogin: true, showRegistration: true });
    });

    app.post("/register", [registerUser, passport.authenticate("local", { failureRedirect: "/" })], (req, res) => {
        res.redirect("/profile");
    });

    app.post("/login", passport.authenticate("local", { failureRedirect: "/" }), (req, res) => {
        res.redirect("/profile");
    });

    app.get("/logout", (req, res) => {
        req.logout();
        res.redirect("/");
    });

    app.get("/profile", ensureAuthenticated, (req, res) => {
        res.render(path.join(__dirname, "/views/pug/profile"), { title: "Profile Page", username: req.user.username });
    });

    // Handling page not found, use after all routes
    app.use((req, res, next) => {
        res.status(404);
    });

    const listener = app.listen(port, () => {
        console.log(`Server running on port ${listener.address().port}`);
    });

    // client.close();
});
