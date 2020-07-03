import {Entity, model, property, hasMany} from '@loopback/repository';
import {Ownerhasfollowers} from './ownerhasfollowers.model';

@model()
export class Owner extends Entity {
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
  brandName: string;

  @property({
    type: 'string',
    required: true,
  })
  brandPicture: string;

  @property({
    type: 'string',
  })
  userId?: string;

  @hasMany(() => Ownerhasfollowers)
  ownerhasfollowers: Ownerhasfollowers[];

  constructor(data?: Partial<Owner>) {
    super(data);
  }
}

export interface OwnerRelations {
  // describe navigational properties here
}

export type OwnerWithRelations = Owner & OwnerRelations;
