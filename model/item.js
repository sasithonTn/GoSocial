const mongoose = require('mongoose');
const { Schema } = mongoose;

const ItemSchema = new Schema({
  item_name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  item_description: {
    type: String,
    required: true
  },
  time: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
});

mongoose.model('Item', ItemSchema);
