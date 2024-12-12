import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat } from './entities/chat.schema';

@Injectable()
export class ChatService {
  constructor(@InjectModel('Chat') private chatModel: Model<Chat>) {}

  async createChat(userIds: string[]): Promise<Chat> {
    const newChat = new this.chatModel({ userIds, messages: [] });
    return newChat.save();
  }

  async addMessage(
    chatId: string, 
    senderId: string, 
    text: string, 
  ): Promise<Chat> {
    const chat = await this.chatModel.findById(chatId);
    chat.messages.push({ senderId, text, createdAt: new Date() });
    return chat.save();
  }

  async getChatById(chatId: string): Promise<Chat> {
    return this.chatModel.findById(chatId).exec();
  }
}