const express = require('express');
const bodyParser = require('body-parser');

const mongodb = require('./data/database');

const app = express();
const port = process.env.PORT || 3001;

// Correct usage of middleware
app.use(bodyParser.json());

// Assuming routes/index.js exports a router

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use('/', require('./routes'));

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Database is connected and Node is running on port ${port}`);
    });
  }
});