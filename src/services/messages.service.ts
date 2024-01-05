import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LikeMessageDto, UserMessageDto } from 'src/dto/user.dto';
import { Message } from 'src/schemas/message.schema';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel('Message') private readonly messageModel: Model<Message>,
  ) {}
  async createMessage(message: UserMessageDto) {
    return await this.messageModel.create(message);
  }

  async likeMessage(message: LikeMessageDto) {
    const messageDetails = await this.messageModel.findOne({
      _id: message.messageId,
    });

    messageDetails.likedUsers.push(message.likerId);

    return await this.messageModel.updateOne(
      { id: message.likerId },
      messageDetails,
    );
  }
}
