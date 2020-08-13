import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Publication, PublicationReaction, PublicationReactionRelations, User} from '../models';
import {PublicationRepository} from './publication.repository';
import {UserRepository} from './user.repository';

export class PublicationReactionRepository extends DefaultCrudRepository<
  PublicationReaction,
  typeof PublicationReaction.prototype.id,
  PublicationReactionRelations
  > {

  // public readonly reaction: BelongsToAccessor<Reaction, typeof PublicationReaction.prototype.id>;

  public readonly user: BelongsToAccessor<User, typeof PublicationReaction.prototype.id>;

  public readonly publication: BelongsToAccessor<Publication, typeof PublicationReaction.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('PublicationRepository') protected publicationRepositoryGetter: Getter<PublicationRepository>,
  ) {
    super(PublicationReaction, dataSource);
    this.publication = this.createBelongsToAccessorFor('publication', publicationRepositoryGetter,);
    this.registerInclusionResolver('publication', this.publication.inclusionResolver);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
    // this.reaction = this.createBelongsToAccessorFor('reaction', reactionRepositoryGetter,);
    // this.registerInclusionResolver('reaction', this.reaction.inclusionResolver);
  }
}
