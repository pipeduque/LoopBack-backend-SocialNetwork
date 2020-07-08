import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Room} from './room.model';
import {User} from './user.model';

@model()
export class Request extends Entity {
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

  @property({
    type: 'boolean',
    required: true,
  })
  status: boolean;

  @belongsTo(() => Room)
  roomId: string;

  @belongsTo(() => User)
  userId: string;

  constructor(data?: Partial<Request>) {
    super(data);
  }
}

export interface RequestRelations {
  // describe navigational properties here
}

export type RequestWithRelations = Request & RequestRelations;
