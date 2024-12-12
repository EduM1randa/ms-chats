import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema()
export class Chat {
  _id?: Types.ObjectId;

  @Prop({ required: true, maxlength: 2 })
  userIds: string[];

  @Prop({ required: true })
  messages: [{
    senderId: string,
    text: string,
    createdAt: Date
  }]
}

export const ChatSchema = SchemaFactory.createForClass(Chat);