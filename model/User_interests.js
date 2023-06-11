const mongoose = require('mongoose');
const { Schema } = mongoose;

const userInterestSchema = new Schema({
    user_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'accounts',
        required: true
    },
    interest: {
        type: String,
        required: true
    },
    character: {
        type: String,
        required: true
    },
});

mongoose.model('user_interests', userInterestSchema);