import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Chat} from './chat.model';
import {User} from './user.model';

@model()
export class Message extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  text: string;

  @property({
    type: 'date',
    required: true,
  })
  date: string;

  @belongsTo(() => Chat)
  chatId: string;

  @belongsTo(() => User)
  userId: string;

  constructor(data?: Partial<Message>) {
    super(data);
  }
}

export interface MessageRelations {
  // describe navigational properties here
}

export type MessageWithRelations = Message & MessageRelations;
