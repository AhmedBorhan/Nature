const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


//connecting to mongodb atlas Database
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

//getting routers
const activity = require('./routes/activity');
const admin = require('./routes/admin');

//middleware
//routes 
app.use('/api/activity', activity);
app.use('/api/admin', admin)

//opening the server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});