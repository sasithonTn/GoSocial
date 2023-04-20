const mongoose = require('mongoose');
const { Schema } = mongoose;

const User_objSchema = new Schema({
    user_id : {
        type: Schema.Types.ObjectId, 
        ref: 'accounts'},

    object_id : {
        type: Schema.Types.ObjectId, 
        ref: 'objects'},
    
    used: {
        type: Boolean,
        default: false
    }    
});

mongoose.model('user_objects', User_objSchema);