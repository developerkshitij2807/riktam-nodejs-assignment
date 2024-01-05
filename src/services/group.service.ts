import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Group } from 'src/schemas/groups.schemas';

@Injectable()
export class GroupService {
  constructor(
    @InjectModel('Group') private readonly groupModel: Model<Group>,
  ) {}

  async createGroup(createGroupDto: any) {
    try {
      return await this.groupModel.create(createGroupDto);
    } catch (error) {
      throw Error(error);
    }
  }
  async deleteGroup(groupId: Types.ObjectId) {
    try {
      return await this.groupModel.deleteOne({ id: groupId });
    } catch (error) {
      throw Error(error);
    }
  }
  
  async searchMembers(groupId: string) {
    try {
      const group = await this.groupModel.findById({ _id: groupId });
      return group.members;
    } catch (error) {
      throw Error(error);
    }
  }
  async addMembers(addMembersDto: any) {
    try {
      const group = await this.groupModel.findById({
        _id: addMembersDto.groudId,
      });
      group.members.push(addMembersDto);
      return await this.groupModel.updateOne({ _id: group._id }, { group });
    } catch (error) {
      throw Error(error);
    }
  }

  async findGroupById(id: Types.ObjectId) {
    try {
      return await this.groupModel.findById({
        _id: id,
      });
    } catch (error) {
      throw Error(error);
    }
  }

  async updateGroupById(id: Types.ObjectId, group: Group) {
    try {
      return await this.groupModel.findByIdAndUpdate(
        {
          _id: id,
        },
        group,
      );
    } catch (error) {
      throw Error(error);
    }
  }
}
