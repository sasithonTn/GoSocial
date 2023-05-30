const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

//set up db
const mongoose = require('mongoose');
const url = 'mongodb+srv://goSocail:myamtan@cluster0.ypcqdkb.mongodb.net/GoSocial';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true,});


//setup db models
require('./model/Account.js');
require('./model/item.js');
require('./model/User_objects.js');
require('./model/Object_position.js');

require('./model/focus_time.js')
require('./model/tag.js')
require('./model/quest_time.js')
require('./model/quest.js')

//setup routes
require('./routes/authenticationRoutes.js')(app);
require('./routes/itemRoutes.js')(app);
require('./routes/userObjRoutes.js')(app);
require('./routes/focus_timeRoutes.js')(app);
require('./routes/tag_Routes.js')(app);
require('./routes/quest_Routes.js')(app);
require('./routes/quest_timeRoutes.js')(app);
require('./routes/objectPositionRoutes.js')(app);

app.listen(3000, ()=>{
    console.log("listenind on 3000");
});