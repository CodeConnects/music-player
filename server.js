const express = require('express');
const app = express();
require('dotenv').config();
const dbConfig = require('./config/dbConfig');
const path = require('path');
app.use(express.json());
const userRoute = require('./routes/userRoute');
const songsRoute = require('./routes/songsRoute');

app.use('/api/users', userRoute);
app.use('/api/songs', songsRoute);

const port = 5000;
app.listen(port, () => console.log(`Nodejs server port ${port}!`));
