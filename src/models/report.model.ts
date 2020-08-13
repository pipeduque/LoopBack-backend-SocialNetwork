import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Publication} from './publication.model';
import {User} from './user.model';

@model()
export class Report extends Entity {
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
  date: string;

  @property({
    type: 'string',
    required: true,
  })
  text: string;

  @property({
    type: 'string',
    required: true,
  })
  pdf: string;
  @belongsTo(() => Publication)
  publicationId: string;

  @belongsTo(() => User)
  informerId: string;

  constructor(data?: Partial<Report>) {
    super(data);
  }
}

export interface ReportRelations {
  // describe navigational properties here
}

export type ReportWithRelations = Report & ReportRelations;
