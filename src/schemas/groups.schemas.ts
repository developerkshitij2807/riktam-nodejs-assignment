import mongoose, { Types } from 'mongoose';

export const GroupSchema = new mongoose.Schema({
  name: String,
  adminId: Types.ObjectId,
  messages: Array<Types.ObjectId>,
  members: Array<Types.ObjectId>,
});

export interface Group {
  id: string;
  name: string;
  adminId: Types.ObjectId;
  messages: Array<Types.ObjectId>;
  members: Array<Types.ObjectId>;
}
