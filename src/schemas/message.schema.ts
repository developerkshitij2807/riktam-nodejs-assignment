import mongoose from 'mongoose';

export const MessageSchema = new mongoose.Schema({
  text: String,
  userId: String,
  groupId: String,
});

export const MessageModel = mongoose.model('MessageModel', MessageSchema);
