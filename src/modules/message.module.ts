import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageSchema } from 'src/schemas/message.schema';
import { MessageService } from 'src/services/messages.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }]),
  ],
  controllers: [],
  providers: [MessageService],
  exports: [MessageService],
})
export class MessageModule {}
