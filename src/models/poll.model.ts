import {Entity, model, property, belongsTo} from '@loopback/repository';
import {User} from './user.model';

@model()
export class Poll extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  questions: string[];

  @belongsTo(() => User)
  userId: string;

  constructor(data?: Partial<Poll>) {
    super(data);
  }
}

export interface PollRelations {
  // describe navigational properties here
}

export type PollWithRelations = Poll & PollRelations;
