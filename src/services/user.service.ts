import { Injectable } from '@nestjs/common';
import {
  CreateUserDto,
  EditUserDto,
  LikeMessageDto,
  UserMessageDto,
} from 'src/dto/user.dto';
import { UserModel } from 'src/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { MessageModel } from 'src/schemas/message.schema';
import { GroupModel } from 'src/schemas/groups.schemas';

@Injectable()
export class UserService {
  async create(user: CreateUserDto) {
    try {
      const checkUser = await UserModel.find({
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

      return await UserModel.create(userData);
    } catch (error) {
      throw Error(error);
    }
  }

  async edit(user: EditUserDto) {
    try {
      return await UserModel.findByIdAndUpdate(
        {
          _id: user.id,
        },
        user,
      );
    } catch (error) {
      throw Error(error);
    }
  }

  async sendMessage(message: UserMessageDto) {
    try {
      const newMessage = await MessageModel.create(message);

      const user = await UserModel.findOne({ _id: message.userId });

      const group = await GroupModel.findOne({ _id: message.groupId });

      group.messages.push(newMessage._id);

      user.messages.push(newMessage._id);

      await UserModel.updateOne({ _id: user._id }, { user });
      await GroupModel.updateOne({ _id: group._id }, { group });
    } catch (error) {
      throw Error(error);
    }
  }

  async likeMessage(likeMessageDto: LikeMessageDto) {
    try {
      const user = await UserModel.findOne({ _id: likeMessageDto.likerId });

      user.likedMessages.push(likeMessageDto.messageId);

      return await UserModel.updateOne({ _id: user._id }, { user });
    } catch (error) {
      throw Error(error);
    }
  }

  async createGroup(createGroupDto: any) {
    try {
      return await GroupModel.create(createGroupDto);
    } catch (error) {
      throw Error(error);
    }
  }

  async deleteGroup(groudId: string) {
    try {
      return await GroupModel.deleteOne({ _id: groudId });
    } catch (error) {
      throw Error(error);
    }
  }

  async searchMembers(groupId: string) {
    try {
      const group = await GroupModel.findById({ _id: groupId });

      return group.members;
    } catch (error) {
      throw Error(error);
    }
  }

  async addMembers(addMembersDto: any) {
    try {
      const group = await GroupModel.findById({ _id: addMembersDto.groudId });

      group.members.push(addMembersDto);

      return await GroupModel.updateOne({ _id: group._id }, { group });
    } catch (error) {
      throw Error(error);
    }
  }

  async findByUsername(username: String) {
    try {
      return await UserModel.findOne({ username: username });
    } catch (error) {
      throw Error(error);
    }
  }
}
