import {Getter, inject} from '@loopback/core';
import {
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  repository,
} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {
  Chat,
  Message,
  Owner,
  Ownerhasfollowers,
  Publication,
  User,
  UserRelations,
} from '../models';
import {ChatRepository} from './chat.repository';
import {MessageRepository} from './message.repository';
import {OwnerRepository} from './owner.repository';
import {OwnerhasfollowersRepository} from './ownerhasfollowers.repository';
import {PublicationRepository} from './publication.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  public readonly publications: HasManyRepositoryFactory<
    Publication,
    typeof User.prototype.id
  >;

  public readonly chats: HasManyRepositoryFactory<
    Chat,
    typeof User.prototype.id
  >;

  public readonly messages: HasManyRepositoryFactory<
    Message,
    typeof User.prototype.id
  >;

  public readonly owners: HasManyRepositoryFactory<
    Owner,
    typeof User.prototype.id
  >;

  public readonly ownerhasfollowers: HasManyRepositoryFactory<
    Ownerhasfollowers,
    typeof User.prototype.id
  >;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
    @repository.getter('PublicationRepository')
    protected publicationRepositoryGetter: Getter<PublicationRepository>,
    @repository.getter('ChatRepository')
    protected chatRepositoryGetter: Getter<ChatRepository>,
    @repository.getter('MessageRepository')
    protected messageRepositoryGetter: Getter<MessageRepository>,
    @repository.getter('OwnerRepository')
    protected ownerRepositoryGetter: Getter<OwnerRepository>,
    @repository.getter('OwnerhasfollowersRepository')
    protected ownerhasfollowersRepositoryGetter: Getter<
      OwnerhasfollowersRepository
    >,
  ) {
    super(User, dataSource);
    this.ownerhasfollowers = this.createHasManyRepositoryFactoryFor(
      'ownerhasfollowers',
      ownerhasfollowersRepositoryGetter,
    );
    this.registerInclusionResolver(
      'ownerhasfollowers',
      this.ownerhasfollowers.inclusionResolver,
    );
    this.owners = this.createHasManyRepositoryFactoryFor(
      'owners',
      ownerRepositoryGetter,
    );
    this.registerInclusionResolver('owners', this.owners.inclusionResolver);
    this.messages = this.createHasManyRepositoryFactoryFor(
      'messages',
      messageRepositoryGetter,
    );
    this.registerInclusionResolver('messages', this.messages.inclusionResolver);
    this.chats = this.createHasManyRepositoryFactoryFor(
      'chats',
      chatRepositoryGetter,
    );
    this.registerInclusionResolver('chats', this.chats.inclusionResolver);
    this.publications = this.createHasManyRepositoryFactoryFor(
      'publications',
      publicationRepositoryGetter,
    );
    this.registerInclusionResolver(
      'publications',
      this.publications.inclusionResolver,
    );
  }
}
