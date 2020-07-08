import {Entity, model, property, hasOne, hasMany, belongsTo} from '@loopback/repository';
import {Publication} from './publication.model';
import {Occupant} from './occupant.model';
import {Request} from './request.model';
import {Owner} from './owner.model';

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
