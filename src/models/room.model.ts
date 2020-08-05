import {
  belongsTo,
  Entity,
  hasMany,
  hasOne,
  model,
  property,
} from '@loopback/repository';
import {Occupant} from './occupant.model';
import {Owner} from './owner.model';
import {Publication} from './publication.model';
import {Request} from './request.model';

@model()
export class Room extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  reference?: string;

  @property({
    type: 'string',
    required: false,
  })
  path: string;

  @property({
    type: 'string',
    required: true,
  })
  price: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'number',
  })
  rating?: number;

  @property({
    type: 'boolean',
    required: true,
  })
  status: boolean;

  @hasOne(() => Publication)
  publication: Publication;

  @hasMany(() => Occupant)
  occupants: Occupant[];

  @hasMany(() => Request)
  requests: Request[];

  @belongsTo(() => Owner)
  ownerId: string;

  constructor(data?: Partial<Room>) {
    super(data);
  }
}

export interface RoomRelations {
  // describe navigational properties here
}

export type RoomWithRelations = Room & RoomRelations;
