import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {Notification, NotificationRelations, Comment} from '../models';
import {MongoDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {CommentRepository} from './comment.repository';

export class NotificationRepository extends DefaultCrudRepository<
  Notification,
  typeof Notification.prototype.id,
  NotificationRelations
> {

  public readonly comment: HasOneRepositoryFactory<Comment, typeof Notification.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('CommentRepository') protected commentRepositoryGetter: Getter<CommentRepository>,
  ) {
    super(Notification, dataSource);
    this.comment = this.createHasOneRepositoryFactoryFor('comment', commentRepositoryGetter);
    this.registerInclusionResolver('comment', this.comment.inclusionResolver);
  }
}
