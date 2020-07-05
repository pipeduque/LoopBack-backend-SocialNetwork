import {Entity, model, property, hasOne} from '@loopback/repository';
import {Room} from './room.model';
import {User} from './user.model';

@model()
export class Occupant extends Entity {
  @property({
    type: 'boolean',
    required: true,
  })
  occuped: boolean;

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

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

  constructor(data?: Partial<Occupant>) {
    super(data);
  }
}

export interface OccupantRelations {
  // describe navigational properties here
}

export type OccupantWithRelations = Occupant & OccupantRelations;
