import {Entity, model, property} from '@loopback/repository';

@model()
export class Follower extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  ownerId?: string;

  @property({
    type: 'string',
  })
  userId?: string;

  constructor(data?: Partial<Follower>) {
    super(data);
  }
}

export interface FollowerRelations {
  // describe navigational properties here
}

export type FollowerWithRelations = Follower & FollowerRelations;
