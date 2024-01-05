import mongoose, { Types } from 'mongoose';

export const MessageSchema = new mongoose.Schema({
  text: String,
  userId: Types.ObjectId,
  groupId: Types.ObjectId,
  likedUsers: Array<Types.ObjectId>,
});

export interface Message {
  id: Types.ObjectId;
  text: String;
  userId: Types.ObjectId;
  groupId: Types.ObjectId;
  likedUsers: Array<Types.ObjectId>;
}
