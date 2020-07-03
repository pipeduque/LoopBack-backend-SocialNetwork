import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {User} from './user.model';
import {Message} from './message.model';

@model()
export class Chat extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  date: string;

  @belongsTo(() => User)
  userId: string;

  @hasMany(() => Message)
  chats: Message[];

  constructor(data?: Partial<Chat>) {
    super(data);
  }
}

export interface ChatRelations {
  // describe navigational properties here
}

export type ChatWithRelations = Chat & ChatRelations;
