import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Publication} from './publication.model';
import {User} from './user.model';

@model()
export class Comment extends Entity {
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
    type: 'string',
    required: false,
  })
  image: string;

  @property({
    type: 'date',
    required: true,
  })
  date: string;
  @belongsTo(() => Publication)
  publicationId: string;

  @belongsTo(() => User)
  userId: string;

  constructor(data?: Partial<Comment>) {
    super(data);
  }
}

export interface CommentRelations {
  // describe navigational properties here
}

export type CommentWithRelations = Comment & CommentRelations;
