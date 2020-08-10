import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Publication} from './publication.model';

@model()
export class PublicationFile extends Entity {
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
  path: string;

  @belongsTo(() => Publication)
  publicationId: string;

  constructor(data?: Partial<PublicationFile>) {
    super(data);
  }
}

export interface PublicationFileRelations {
  // describe navigational properties here
}

export type PublicationFileWithRelations = PublicationFile &
  PublicationFileRelations;
