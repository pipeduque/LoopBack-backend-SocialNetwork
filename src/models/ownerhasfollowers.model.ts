import {Entity, model, property} from '@loopback/repository';

@model()
export class Ownerhasfollowers extends Entity {
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

  constructor(data?: Partial<Ownerhasfollowers>) {
    super(data);
  }
}

export interface OwnerhasfollowersRelations {
  // describe navigational properties here
}

export type OwnerhasfollowersWithRelations = Ownerhasfollowers & OwnerhasfollowersRelations;
