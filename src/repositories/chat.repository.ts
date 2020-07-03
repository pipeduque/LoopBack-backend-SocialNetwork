import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {Chat, ChatRelations, User, Message} from '../models';
import {MongoDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UserRepository} from './user.repository';
import {MessageRepository} from './message.repository';

export class ChatRepository extends DefaultCrudRepository<
  Chat,
  typeof Chat.prototype.id,
  ChatRelations
> {

  public readonly user: BelongsToAccessor<User, typeof Chat.prototype.id>;

  public readonly chats: HasManyRepositoryFactory<Message, typeof Chat.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('MessageRepository') protected messageRepositoryGetter: Getter<MessageRepository>,
  ) {
    super(Chat, dataSource);
    this.chats = this.createHasManyRepositoryFactoryFor('chats', messageRepositoryGetter,);
    this.registerInclusionResolver('chats', this.chats.inclusionResolver);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
