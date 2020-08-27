import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Publication, PublicationRelations, User} from '../models';
import {UserRepository} from './user.repository';

export class PublicationRepository extends DefaultCrudRepository<
  Publication,
  typeof Publication.prototype.id,
  PublicationRelations
  > {

  public readonly user: BelongsToAccessor<User, typeof Publication.prototype.id>;


  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Publication, dataSource);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
