const mongoose = require('mongoose');
const { Schema } = mongoose;

const focus_timeSchema = new Schema({
    user_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'accounts'
    },
    tag_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tag'
    },
    time_completed : String,
    lastAuthentication: Date
});

mongoose.model('focus_time', focus_timeSchema);