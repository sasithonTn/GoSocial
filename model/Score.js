const mongoose = require('mongoose');
const { Schema } = mongoose;

const scoreSchema = new Schema({
    user_id : String,
    score : Number,

    lastAuthentication: Date, 
});

mongoose.model('scores', scoreSchema);