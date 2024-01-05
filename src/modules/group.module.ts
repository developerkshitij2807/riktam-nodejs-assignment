import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupSchema } from 'src/schemas/groups.schemas';
import { GroupService } from 'src/services/group.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Group', schema: GroupSchema }]),
  ],
  controllers: [],
  providers: [GroupService],
  exports: [GroupService],
})
export class GroupModule {}
