import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Poll, PollRelations, User} from '../models';
import {MongoDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UserRepository} from './user.repository';

export class PollRepository extends DefaultCrudRepository<
  Poll,
  typeof Poll.prototype.id,
  PollRelations
> {

  public readonly user: BelongsToAccessor<User, typeof Poll.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Poll, dataSource);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
