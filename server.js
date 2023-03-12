const express = require('express');
const app = express();

//set up db
const mongoose = require('mongoose');
const url = 'mongodb+srv://goSocail:myamtan@cluster0.ypcqdkb.mongodb.net/GoSocial'
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true,});

//setup db models
require('./model/Account.js')

//setup routes
require('./routes/authenticationRoutes.js')(app);

app.listen(3000, ()=>{
    console.log("listenind on 3000");
});