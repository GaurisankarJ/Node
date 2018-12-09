# Semantic Versioning

>MAJOR.MINOR.PATCH

- MAJOR version when you make incompatible API changes
    
- MINOR version when you add functionality in a backwards-compatible manner
    
- PATCH version when you make backwards-compatible bug fixes
    
- To allow a npm dependency to get updated to the latest PATCH-version, you can prefix the dependency’s version with the tilde-character (~)
    
- The caret (^) allows npm to install future updates as well, tcdhe difference is that the caret will allow both MINOR updates and PATCHes

# Express

Express runs between the server created by Node.js and the frontend pages of a web application. Express also handles an application's routing.

>app.listen(port)

>app.METHOD(PATH, HANDLER)

- METHOD is an http method in lowercase
  
- PATH is a relative path on the server (it can be a string, or even a regular expression)
  
- HANDLER is a function that Express calls when the route is matched
  - Handlers take the form function(req, res) {...}, where req is the request object, and res is the response object
```
    function(req, res) {
    res.send('Response String');
    }
```

## Serve an HTML File

>res.sendFile(path)

- absolutePath = __dirname + relativePath/file.ext

## Serve Static Assets

>express.static(path)

>app.use(path, middlewareFunction)

## Serve JSON on a Specific Route

>res.json()

## Use the .env File

The .env file is a hidden file that is used to pass environment variables to your application. This file is secret, no one but you can access it, and it can be used to store data that you want to keep private or hidden.

>require("dotenv").config();

>process.env.VAR_NAME

- It is also important to note that there cannot be space around the equals sign when you are assigning values to your variables, e.g. VAR_NAME=value

## Implement a Root-Level Request Logger Middleware

```
function(req, res, next) {
console.log("I'm a middleware...");
next();
}
```

## Chain Middleware to Create a Time Server

>app.METHOD(path, middlewareFunction)

```
app.get('/user', function(req, res, next) {
req.user = getTheUserSync(); // Hypothetical synchronous operation
next();
}, function(req, res) {
res.send(req.user);
})
```

## Get Route Parameter Input from the Client

```
route_path: '/user/:userId/book/:bookId'
actual_request_URL: '/user/546/book/6754' 
req.params: {userId: '546', bookId: '6754'}
```

## Get Query Parameter Input from the Client

>req.query

```
route_path: '/library'
actual_request_URL: '/library?userId=546&bookId=6754' 
req.query: {userId: '546', bookId: '6754'}
```

## Use body-parser to Parse POST Requests

>The raw content of an HTTP POST request

```
POST /path/subpath HTTP/1.0
From: john@example.com
User-Agent: someBrowser/1.0
Content-Type: application/x-www-form-urlencoded
Content-Length: 20
name=John+Doe&age=25
```

## Get Data from POST Requests

>req.body

```
route: POST '/library'
urlencoded_body: userId=546&bookId=6754 
req.body: {userId: '546', bookId: '6754'}
```