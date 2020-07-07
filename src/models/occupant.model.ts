import {Entity, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<Occupant>) {
    super(data);
  }
}

export interface OccupantRelations {
  // describe navigational properties here
}

export type OccupantWithRelations = Occupant & OccupantRelations;
