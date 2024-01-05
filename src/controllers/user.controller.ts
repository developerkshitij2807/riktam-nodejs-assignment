import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import {
  CreateUserDto,
  EditUserDto,
  LikeMessageDto,
  UserMessageDto,
} from 'src/dto/user.dto';
import { GroupService } from 'src/services/group.service';
import { UserService } from 'src/services/user.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly groupService: GroupService,
  ) {}
  @Post('/create')
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Patch('/edit')
  async edit(@Body() editUserDto: EditUserDto) {
    return this.userService.edit(editUserDto);
  }

  @Post('/sendMessage')
  async sendMessage(@Body() message: UserMessageDto) {
    return this.userService.sendMessage(message);
  }

  @Patch('/likeMessage')
  async likeMessage(likeMessageDto: LikeMessageDto) {
    return this.userService.likeMessage(likeMessageDto);
  }

  @Post('/createGroup')
  async createGroup(createGroupDto: any) {
    return this.groupService.createGroup(createGroupDto);
  }

  @Delete('/deleteGroup')
  async deleteGroup(groudId: string) {
    return this.groupService.deleteGroup(groudId);
  }

  @Get('/searchMembers')
  async searchMembers(groupId: string) {
    return this.groupService.searchMembers(groupId);
  }

  @Get()
  async getUsers() {
    return this.userService.getUsers();
  }

  @Post('/addMembers')
  async addMembers(addMembersDto: any) {
    return this.groupService.addMembers(addMembersDto);
  }
}
