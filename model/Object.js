const mongoose = require('mongoose');
const { Schema } = mongoose;

const ObjectSchema = new Schema({
    object_name : String,
    object_description : String,
    object_color : String,
});

mongoose.model('objects', ObjectSchema);