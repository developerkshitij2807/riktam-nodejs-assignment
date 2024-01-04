import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: String,
  username: Number,
  hashedPassword: String,
  messages: Array<String>,
  likedMessages: Array<String>,
});

export const UserModel = mongoose.model('UserModel', UserSchema);
