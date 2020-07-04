import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {PollAnswer, PollAnswerRelations, User, Poll} from '../models';
import {MongoDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UserRepository} from './user.repository';
import {PollRepository} from './poll.repository';

export class PollAnswerRepository extends DefaultCrudRepository<
  PollAnswer,
  typeof PollAnswer.prototype.id,
  PollAnswerRelations
> {

  public readonly user: BelongsToAccessor<User, typeof PollAnswer.prototype.id>;

  public readonly poll: BelongsToAccessor<Poll, typeof PollAnswer.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('PollRepository') protected pollRepositoryGetter: Getter<PollRepository>,
  ) {
    super(PollAnswer, dataSource);
    this.poll = this.createBelongsToAccessorFor('poll', pollRepositoryGetter,);
    this.registerInclusionResolver('poll', this.poll.inclusionResolver);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
