import {Getter, inject} from '@loopback/core';
import {
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  repository
} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {
  Chat,



  Follower, Message,


  Notification, Publication,
  User,
  UserRelations
} from '../models';
import {ChatRepository} from './chat.repository';
import {FollowerRepository} from './follower.repository';
import {MessageRepository} from './message.repository';
import {NotificationRepository} from './notification.repository';
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


  public readonly notification: HasManyRepositoryFactory<Notification, typeof User.prototype.id>;

  public readonly followers: HasManyRepositoryFactory<Follower, typeof User.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
    @repository.getter('PublicationRepository')
    protected publicationRepositoryGetter: Getter<PublicationRepository>,
    @repository.getter('ChatRepository')
    protected chatRepositoryGetter: Getter<ChatRepository>,
    @repository.getter('MessageRepository')
    protected messageRepositoryGetter: Getter<MessageRepository>,
    @repository.getter('NotificationRepository')
    protected notificationRepositoryGetter: Getter<NotificationRepository>,
    @repository.getter('FollowerRepository')
    protected followerRepositoryGetter: Getter<FollowerRepository>,
  ) {
    super(User, dataSource);
    this.followers = this.createHasManyRepositoryFactoryFor('followers', followerRepositoryGetter,);
    this.registerInclusionResolver('followers', this.followers.inclusionResolver);
    this.notification = this.createHasManyRepositoryFactoryFor('notification', notificationRepositoryGetter,);
    this.registerInclusionResolver('notification', this.notification.inclusionResolver);
    this.messages = this.createHasManyRepositoryFactoryFor('messages', messageRepositoryGetter,);
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
