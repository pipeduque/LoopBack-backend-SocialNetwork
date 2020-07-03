import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Message, MessageRelations, Chat, User} from '../models';
import {MongoDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {ChatRepository} from './chat.repository';
import {UserRepository} from './user.repository';

export class MessageRepository extends DefaultCrudRepository<
  Message,
  typeof Message.prototype.id,
  MessageRelations
> {

  public readonly chat: BelongsToAccessor<Chat, typeof Message.prototype.id>;

  public readonly user: BelongsToAccessor<User, typeof Message.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('ChatRepository') protected chatRepositoryGetter: Getter<ChatRepository>, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Message, dataSource);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
    this.chat = this.createBelongsToAccessorFor('chat', chatRepositoryGetter,);
    this.registerInclusionResolver('chat', this.chat.inclusionResolver);
  }
}
