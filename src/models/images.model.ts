import {Entity, model, property} from '@loopback/repository';

@model()
export class Images extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  path?: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  order?: string[];


  constructor(data?: Partial<Images>) {
    super(data);
  }
}

export interface ImagesRelations {
  // describe navigational properties here
}

export type ImagesWithRelations = Images & ImagesRelations;
