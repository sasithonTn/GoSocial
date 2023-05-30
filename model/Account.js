const mongoose = require('mongoose');
const { Schema } = mongoose;

const accountSchema = new Schema({
    email : String,
    password : String,
    username : String,
    salt: String,

    lastAuthentication: Date, 
});

mongoose.model('accounts', accountSchema);