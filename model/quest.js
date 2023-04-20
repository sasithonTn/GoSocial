const mongoose = require('mongoose');
const { Schema } = mongoose;

const questSchema = new Schema({
    name : String,
    description : String,
    require_time : String,
    reward : String  
});

mongoose.model('quest', questSchema);