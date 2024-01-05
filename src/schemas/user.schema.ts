import mongoose, { Types } from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: String,
  username: String,
  hashedPassword: String,
  messages: Array<Types.ObjectId>,
  likedMessages: Array<Types.ObjectId>,
});

export interface User {
  id: string;
  name: string;
  username: string;
  hashedPassword: string;
  messages: Array<Types.ObjectId>;
  likedMessages: Array<Types.ObjectId>;
}
