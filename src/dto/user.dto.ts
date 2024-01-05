import { Types } from 'mongoose';
import { Message } from 'src/dto/message.dto';

export class CreateUserDto {
  name: string;
  username: string;
  password: string;
}

export class EditUserDto {
  name: String;
  id: String;
  messages: Array<Message>;
  likedMessages: Array<String>;
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
