import {Entity, model, property, hasOne} from '@loopback/repository';
import {Comment} from './comment.model';

@model()
export class Notification extends Entity {
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
  nameUser: string;

  @property({
    type: 'number',
    default: 0,
  })
  numNotifications?: number;

  @property({
    type: 'date',
    required: true,
  })
  date: string;

  @property({
    type: 'string',
    required: true,
  })
  text: string;

  @property({
    type: 'string',
  })
  userId?: string;

  @hasOne(() => Comment)
  comment: Comment;

  constructor(data?: Partial<Notification>) {
    super(data);
  }
}

export interface NotificationRelations {
  // describe navigational properties here
}

export type NotificationWithRelations = Notification & NotificationRelations;
