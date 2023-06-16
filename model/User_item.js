const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserItemSchema = new Schema({
  user_id : String,
  
  item_name: String,
  lastAuthentication: Date, 
});

mongoose.model('UserItem', UserItemSchema);
