const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = process.env.PORT || 3000;
const mongoUrl = 'mongodb://localhost:27017/my-database';

app.use(bodyParser.json());

app.get('/data', (req, res) => {
  MongoClient.connect(mongoUrl, (err, db) => {
    if (err) throw err;
    const collection = db.collection('data');
    collection.find({}).toArray((err, result) => {
      if (err) throw err;
      res.json(result);
      db.close();
    });
  });
});

app.post('/data', (req, res) => {
  MongoClient.connect(mongoUrl, (err, db) => {
    if (err) throw err;
    const collection = db.collection('data');
    collection.insertOne(req.body, (err, result) => {
      if (err) throw err;
      res.json(result.ops[0]);
      db.close();
    });
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
