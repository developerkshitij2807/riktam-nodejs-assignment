import mongoose from 'mongoose';

export const GroupSchema = new mongoose.Schema({
  name: String,
  adminId: String,
  messages: Array<String>,
  members: Array<String>,
});

export const GroupModel = mongoose.model('GroupModel', GroupSchema);
