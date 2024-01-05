import { Injectable } from '@nestjs/common';
import {
  CreateUserDto,
  EditUserDto,
  LikeMessageDto,
  UserMessageDto,
} from 'src/dto/user.dto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { GroupService } from 'src/services/group.service';
import { MessageService } from 'src/services/messages.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly groupService: GroupService,
    private readonly messageService: MessageService,
  ) {}
  async create(user: CreateUserDto) {
    try {
      const checkUser = await this.userModel.findOne({
        name: user.name,
        username: user.username,
      });

      if (checkUser) {
        throw Error('User already exists');
      }

      const hashedPassword = await bcrypt.hash(user.password, 10);

      const userData = {
        username: user.username,
        hashedPassword: hashedPassword,
        name: user.name,
      };

      return await this.userModel.create(userData);
    } catch (error) {
      throw Error(error);
    }
  }

  async edit(user: EditUserDto) {
    try {
      return await this.userModel.findByIdAndUpdate(
        {
          _id: user.id,
        },
        user,
      );
    } catch (error) {
      throw Error(error);
    }
  }

  async getUsers() {
    try {
      return await this.userModel.find();
    } catch (error) {
      throw Error(error);
    }
  }

  async sendMessage(message: UserMessageDto) {
    try {
      const newMessage = await this.messageService.createMessage(message);

      const user = await this.userModel.findOne({ _id: message.userId });

      const group = await this.groupService.findGroupById(message.groupId);

      group.messages.push(newMessage._id);

      user.messages.push(newMessage._id);

      await this.userModel.updateOne({ _id: user._id }, { user });
      await this.groupService.updateGroupById(group._id, group);

      return newMessage;
    } catch (error) {
      throw Error(error);
    }
  }

  async likeMessage(likeMessageDto: LikeMessageDto) {
    try {
      const user = await this.userModel.findOne({
        _id: likeMessageDto.likerId,
      });

      user.likedMessages.push(likeMessageDto.messageId);

      await this.messageService.likeMessage(likeMessageDto);

      return await this.userModel.updateOne({ _id: user._id }, user);
    } catch (error) {
      throw Error(error);
    }
  }

  async findByUsername(username: String) {
    try {
      return await this.userModel.findOne({ username: username });
    } catch (error) {
      throw Error(error);
    }
  }
}
