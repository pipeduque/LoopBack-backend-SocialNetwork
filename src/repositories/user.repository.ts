import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {User, UserRelations, Publication, Chat, Message} from '../models';
import {MongoDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {PublicationRepository} from './publication.repository';
import {ChatRepository} from './chat.repository';
import {MessageRepository} from './message.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {

  public readonly publications: HasManyRepositoryFactory<Publication, typeof User.prototype.id>;

  public readonly chats: HasManyRepositoryFactory<Chat, typeof User.prototype.id>;

  public readonly messages: HasManyRepositoryFactory<Message, typeof User.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('PublicationRepository') protected publicationRepositoryGetter: Getter<PublicationRepository>, @repository.getter('ChatRepository') protected chatRepositoryGetter: Getter<ChatRepository>, @repository.getter('MessageRepository') protected messageRepositoryGetter: Getter<MessageRepository>,
  ) {
    super(User, dataSource);
    this.messages = this.createHasManyRepositoryFactoryFor('messages', messageRepositoryGetter,);
    this.registerInclusionResolver('messages', this.messages.inclusionResolver);
    this.chats = this.createHasManyRepositoryFactoryFor('chats', chatRepositoryGetter,);
    this.registerInclusionResolver('chats', this.chats.inclusionResolver);
    this.publications = this.createHasManyRepositoryFactoryFor('publications', publicationRepositoryGetter,);
    this.registerInclusionResolver('publications', this.publications.inclusionResolver);
  }
}
