import {Entity, model, property, belongsTo} from '@loopback/repository';
import {User} from './user.model';
import {Poll} from './poll.model';

@model()
export class PollAnswer extends Entity {
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
  answers: string[];

  @property({
    type: 'date',
    required: true,
  })
  date: string;
  @belongsTo(() => User)
  userId: string;

  @belongsTo(() => Poll)
  pollId: string;

  constructor(data?: Partial<PollAnswer>) {
    super(data);
  }
}

export interface PollAnswerRelations {
  // describe navigational properties here
}

export type PollAnswerWithRelations = PollAnswer & PollAnswerRelations;
