import {Entity, hasMany, model, property} from '@loopback/repository';
import {Chat} from './chat.model';
import {Message} from './message.model';
import {Owner} from './owner.model';
import {Ownerhasfollowers} from './ownerhasfollowers.model';
import {Publication} from './publication.model';
import {Occupant} from './occupant.model';
import {Request} from './request.model';

@model()
export class User extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  firstName: string;

  @property({
    type: 'string',
  })
  secondName?: string;

  @property({
    type: 'string',
    required: true,
  })
  surname: string;

  @property({
    type: 'string',
  })
  secondSurname?: string;

  @property({
    type: 'number',
    required: true,
  })
  cellphone: number;

  @property({
    type: 'string',
    required: true,
  })
  gender: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'date',
    required: true,
  })
  birthday: string;

  @property({
    type: 'string',
  })
  pathPhoto?: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  interests?: string[];

  @property({
    type: 'number',
    itemType: 'string',
  })
  role?: string[];

  @hasMany(() => Publication)
  publications: Publication[];

  @hasMany(() => Chat)
  chats: Chat[];

  @hasMany(() => Message)
  messages: Message[];

  @hasMany(() => Owner)
  owners: Owner[];

  @hasMany(() => Ownerhasfollowers)
  ownerhasfollowers: Ownerhasfollowers[];

  @hasMany(() => Occupant)
  occupants: Occupant[];

  @hasMany(() => Request)
  requests: Request[];

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
