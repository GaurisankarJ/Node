const path = require("path");
const express = require("express");
// Requiring HelmetJS
const helmet = require("helmet");
// Require BCrypt
const bcrypt = require("bcrypt");

const app = express();
const port = 4000;

// Use default HelmetJS features
// app.use(helmet());
// app.use(helmet({
//     frameguard: { action: "deny" },
//     contentSecurityPolicy: {
//         directives: {
//             defaultSrc: ["'self'"],
//             styleSrc: ["'self'", "maxcdn.bootstrapcdn.com'"]
//         }
//     },
//     dnsPrefetchControl: false
// }));

// Hide potentially dangerous information
app.use(helmet.hidePoweredBy({ setTo: "PHP 4.2.0" }));

// Mitigate ClickJacking
app.use(helmet.frameguard({ action: "deny" }));

// Mitigate Cross Site Scripting (XSS) Attacks
app.use(helmet.xssFilter());

// Avoid inferring the response MIME type
app.use(helmet.noSniff());

// Prevent IE from opening un-trusted HTML
app.use(helmet.ieNoOpen());

// Ask browsers to access your site via HTTPS only
const ninetyDaysInMilliseconds = 90 * 24 * 60 * 60 * 1000;
app.use(helmet.hsts({ maxAge: ninetyDaysInMilliseconds, force: true }));

// Disable DNS pre-fetching
app.use(helmet.dnsPrefetchControl());

// Disable client-Side caching, use only when needed
app.use(helmet.noCache());

// Content Security Policy
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "maxcdn.bootstrapcdn.com'"]
    }
}));

// Use BCrypt
const saltRounds = 12;
const myPlaintextPassword = "sUperpassw0rd!";
const someOtherPlaintextPassword = "pass123";

// Async
bcrypt.hash(myPlaintextPassword, saltRounds, (err, hash) => {
    console.log("ASYNC", hash);
    bcrypt.compare(myPlaintextPassword, hash, (e, res) => {
        if (e) {
            console.log(e);
        }
        console.log("ASYNC", res); // true
    });
});

// Sync
const hash = bcrypt.hashSync(someOtherPlaintextPassword, saltRounds);
console.log("SYNC", hash);
const result = bcrypt.compareSync(someOtherPlaintextPassword, hash);
console.log("SYNC", result);

app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/index.html"));
});

const listener = app.listen(port, () => {
    console.log(`Server running on port ${listener.address().port}`);
});
