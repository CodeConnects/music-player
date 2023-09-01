const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL);

const connection = mongoose.connection;

connection.on('connected', () => {
  console.log('Mongoose now connected mongodb-compass');
});

connection.on('error', (err) => {
  console.log('Mongoose default connection error: ' + err);
});

module.exports = connection;
