const express = require('express');
const env = require('dotenv').config()
const connectDB = require('./config/db.js');
const route = require('./routes/route.js');
const cors = require('cors');


const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json())

app.use('/', route)

const PORT = 8000
connectDB();

app.listen(
    PORT, () => {
        console.log(`server is connected at port : ${PORT}`)
    })