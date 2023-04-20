const mongoose = require('mongoose');
const { Schema } = mongoose;

const tagSchema = new Schema({
    name : String   
});

mongoose.model('tag', tagSchema);