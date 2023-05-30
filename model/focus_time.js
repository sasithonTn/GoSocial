const mongoose = require('mongoose');
const { Schema } = mongoose;

const focus_timeSchema = new Schema({
    user_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'accounts',
        required: true
    },
    tag_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tag',
        required: true
    },
    
    time_set :{
        type: String,
        required: true
    },
    focus_time_status: {
        type: Boolean,
        required: true
    },

    lastAuthentication: Date,
    
});

mongoose.model('focus_times', focus_timeSchema);