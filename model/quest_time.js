const mongoose = require('mongoose');
const { Schema } = mongoose;

const quest_timeSchema = new Schema({
    _id : String,
    user_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'accounts'
    },
    quest_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'quest'
    },
    time_completed : String,
    date_completed : String
});

mongoose.model('quest_time', quest_timeSchema);