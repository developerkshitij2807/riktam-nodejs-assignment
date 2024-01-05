import { Types } from 'mongoose';

export class CreateUserDto {
  name: string;
  username: string;
  password: string;
}

export class EditUserDto {
  name: String;
  id: String;
  messages: Array<Types.ObjectId>;
  likedMessages: Array<Types.ObjectId>;
  username: String;
  password: String;
}

export class UserMessageDto {
  text: string;
  userId: string;
  groupId: Types.ObjectId;
}

export class LikeMessageDto {
  likerId: Types.ObjectId;
  messageId: Types.ObjectId;
}
