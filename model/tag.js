const mongoose = require('mongoose');
const { Schema } = mongoose;

const tagSchema = new Schema({
    _id: String,
    name : String   
});

mongoose.model('tag', tagSchema);