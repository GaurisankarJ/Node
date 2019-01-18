# MongoDB

>RoboMongo

## Terminology

It's a noSQL database. SQL has a **table** like structure and noSQL has a **collection** like structure. A row/record is called a document in noSQL, a column is called a field.

>MongoDB, Ref: https://github.com/mongodb/node-mongodb-native, http://mongodb.github.io/node-mongodb-native/3.1/api/

```
mongodb://localhost:27017/<db_name>
mongodb --dbpath <db_path>
```

>HTTP Statuses, Ref: https://httpstatuses.com/

>Update Operators: https://docs.mongodb.com/manual/reference/operator/update/

>Mongoose ORM (Object Relational Mapping), Ref: https://mongoosejs.com/docs/guide.html

>PostMan, Ref: https://www.getpostman.com/

>DB path: /Users/sankar/Documents/VisualStudioCode/Node/Udemy/NodeTodoAPI/db

## Heroku 

```
heroku create
heroku addons:create mongolab:sandbox
heroku config
git push heroku master
heroku logs
heroku open
```
