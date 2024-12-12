import { Module } from '@nestjs/common';
import { ChatGateway } from './chats.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Chat, ChatSchema } from './entities/chat.schema';
import { ChatService } from './chats.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Chat.name,
        schema: ChatSchema,
      }
    ]),
  ],
  providers: [ChatGateway, ChatService],
})
export class ChatsModule {}
