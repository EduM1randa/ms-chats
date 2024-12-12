import { Module } from '@nestjs/common';
import { ChatsModule } from './chats/chats.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI_BASE || ''),
    ChatsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
