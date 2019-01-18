# MongoDB

>RoboMongo

## Terminology

It's a noSQL database. SQL has a **table** like structure and noSQL has a **collection** like structure. A row/record is called a document in noSQL, a column is called a field.

>Ref: https://github.com/mongodb/node-mongodb-native, http://mongodb.github.io/node-mongodb-native/3.1/api/, https://httpstatuses.com/

>Update Operators: https://docs.mongodb.com/manual/reference/operator/update/

>DB path: /Users/sankar/Documents/VisualStudioCode/Node/Udemy/NodeTodoAPI/db

```
mongodb://localhost:27017/<db_name>
```

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
```
