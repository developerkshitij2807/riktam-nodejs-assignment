import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import {
  CreateUserDto,
  EditUserDto,
  LikeMessageDto,
  UserMessageDto,
} from 'src/dto/user.dto';
import { UserService } from 'src/services/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
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
    return this.userService.createGroup(createGroupDto);
  }

  @Delete('/deleteGroup')
  async deleteGroup(groudId: string) {
    return this.userService.deleteGroup(groudId);
  }

  @Get('/searchMembers')
  async searchMembers(groupId: string) {
    return this.userService.searchMembers(groupId);
  }

  @Post('/addMembers')
  async addMembers(addMembersDto: any) {
    return this.userService.addMembers(addMembersDto);
  }
}
