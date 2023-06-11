const mongoose = require('mongoose');
const { Schema } = mongoose;

const interestsSchema = new Schema({
    name : String
});

mongoose.model('interests', interestsSchema);