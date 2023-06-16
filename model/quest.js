const mongoose = require('mongoose');
const { Schema } = mongoose;

const questSchema = new Schema({
    id : String,
    name : String,
    description : String,
    require_time : Number,
    reward : String  
});

mongoose.model('quest', questSchema);