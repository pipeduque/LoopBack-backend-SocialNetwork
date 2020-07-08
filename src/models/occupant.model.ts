import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Room} from './room.model';
import {User} from './user.model';

@model()
export class Occupant extends Entity {
  @property({
    type: 'number',
    required: true,
  })
  occuped: number;

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @belongsTo(() => Room)
  roomId: string;

  @belongsTo(() => User)
  userId: string;

  constructor(data?: Partial<Occupant>) {
    super(data);
  }
}

export interface OccupantRelations {
  // describe navigational properties here
}

export type OccupantWithRelations = Occupant & OccupantRelations;
