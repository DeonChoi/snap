require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const dbURI = process.env.DB_CONNECTION;

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});

const userRouter = require('./routes/user');
const collectionRouter = require('./routes/collection');

app.use('/user', userRouter);
app.use('/collection', collectionRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});