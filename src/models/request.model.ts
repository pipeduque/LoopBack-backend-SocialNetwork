import {Entity, model, property, hasOne} from '@loopback/repository';
import {Room} from './room.model';
import {User} from './user.model';

@model()
export class Request extends Entity {
  @property({
    type: 'date',
    required: true,
  })
  date: string;

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'boolean',
    required: true,
  })
  status: boolean;

  @hasOne(() => Room)
  room: Room;

  @property({
    type: 'string',
  })
  roomId?: string;

  @hasOne(() => User)
  user: User;

  @property({
    type: 'string',
  })
  userId?: string;

  constructor(data?: Partial<Request>) {
    super(data);
  }
}

export interface RequestRelations {
  // describe navigational properties here
}

export type RequestWithRelations = Request & RequestRelations;
