import { 
  WebSocketGateway, 
  SubscribeMessage, 
  MessageBody, 
  WebSocketServer, 
  ConnectedSocket 
} from '@nestjs/websockets';
import { ChatService } from './chats.service';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private chatService: ChatService) {}

  @SubscribeMessage('sendMessage')
  async handleMessage(@MessageBody() data: { chatId: string, senderId: string, content: string }, @ConnectedSocket() client: Socket): Promise<void> {
    const chat = await this.chatService.addMessage(data.chatId, data.senderId, data.content);
    this.server.to(data.chatId).emit('receiveMessage', chat);
  }

  @SubscribeMessage('joinChat')
  handleJoinChat(@MessageBody() chatId: string, @ConnectedSocket() client: Socket): void {
    client.join(chatId);
  }
}