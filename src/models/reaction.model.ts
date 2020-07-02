import {Entity, model, property} from '@loopback/repository';

@model()
export class Reaction extends Entity {
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
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  path: string;


  constructor(data?: Partial<Reaction>) {
    super(data);
  }
}

export interface ReactionRelations {
  // describe navigational properties here
}

export type ReactionWithRelations = Reaction & ReactionRelations;
