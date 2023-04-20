const mongoose = require('mongoose');
const { Schema } = mongoose;

const ObjPositionSchema = new Schema({
    user_id : {
        type : Schema.Types.ObjectId,
        ref: 'accounts'
    },

    object_id : {
        type : Schema.Types.ObjectId,
        ref: 'objects'
    },

    x_position: Number,
    y_position: Number,
});

mongoose.model('object_position', ObjPositionSchema);