# MongoDB

>RoboMongo

## Terminology

It's a noSQL database. SQL has a **table** like structure and noSQL has a **collection** like structure. A row/record is called a document in noSQL, a column is called a field.

>MongoDB, Ref: https://github.com/mongodb/node-mongodb-native, http://mongodb.github.io/node-mongodb-native/3.1/api/

```
mongodb://localhost:27017/<db_name>
mongod --dbpath <db_path>
```

>DB path: /Users/sankar/Documents/VisualStudioCode/Node/Udemy/TodoAPINode/database

>HTTP Statuses, Ref: https://httpstatuses.com/

>Update Operators: https://docs.mongodb.com/manual/reference/operator/update/

>Mongoose ORM (Object Relational Mapping), Ref: https://mongoosejs.com/docs/guide.html

>PostMan, Ref: https://www.getpostman.com/

## Heroku 

```
heroku create
heroku addons:create mongolab:sandbox
heroku config
git push heroku master
heroku logs
heroku open
heroku config:set <key>=<value>
heroku config:unset <key>
heroku config:get <key>
```

## Hashing

>In cryptography, a **salt** is random data that is used as an additional input to a one-way function that ***"hashes"*** data, a password or passphrase. Salts are used to safeguard passwords in storage. 

>JWT, JSON Web Tokens, Ref: https://jwt.io/, https://github.com/auth0/node-jsonwebtoken#token-expiration-exp-claim

>"x-" in front is used to define custom headers

## Testing

>JestJS Expect, Ref: https://jest-bot.github.io/jest/docs/expect.html

>MJackson Expect, "expect": "^1.20.2"