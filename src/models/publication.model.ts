import {Entity, model, property, belongsTo} from '@loopback/repository';
import {User} from './user.model';

@model()
export class Publication extends Entity {
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
  text: string;

  @property({
    type: 'date',
    required: true,
  })
  date: string;

  @belongsTo(() => User)
  userId: string;

  constructor(data?: Partial<Publication>) {
    super(data);
  }
}

export interface PublicationRelations {
  // describe navigational properties here
}

export type PublicationWithRelations = Publication & PublicationRelations;