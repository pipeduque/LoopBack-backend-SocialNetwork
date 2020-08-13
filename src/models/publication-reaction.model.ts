import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Publication} from './publication.model';
import {Reaction} from './reaction.model';
import {User} from './user.model';

@model()
export class PublicationReaction extends Entity {
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

  @belongsTo(() => Reaction)
  reactionId: string;

  @belongsTo(() => User)
  userId: string;

  @belongsTo(() => Publication)
  publicationId: string;

  constructor(data?: Partial<PublicationReaction>) {
    super(data);
  }
}

export interface PublicationReactionRelations {
  // describe navigational properties here
}

export type PublicationReactionWithRelations = PublicationReaction & PublicationReactionRelations;
