
# Basic Book Library

A classic online book library has all the features of a physical library. Online book library system should be user friendly and easy to understand. 

## Prerequisites

Node.js - The backend framework used

Express.js - Node.js framework used

React.js - The frontend framework used

MongoDB - Database platform used

Db name -> library -> collection books

## Installing packages

Install backend packages
```bash
cd server
npm i
```

Install frontend packages
```bash
cd client
npm i
```

## Running the app
```bash
cd server
node app.js
```
```bash
cd client
npm start
```
## Import data to mongodb
mongorestore -d library <path_to_directory>/library/books.bson

## Notes
After Importing the data
Please run the server first and then run the client. Commands are listed above.
Get output From Url :http://<YOUR_LOCALHOST>:8000/api/books (API testing)
Proceed with frontend operations

Screenshots attached for the flow.

