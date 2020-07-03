import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Report, ReportRelations, Publication, User} from '../models';
import {MongoDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {PublicationRepository} from './publication.repository';
import {UserRepository} from './user.repository';

export class ReportRepository extends DefaultCrudRepository<
  Report,
  typeof Report.prototype.id,
  ReportRelations
> {

  public readonly publication: BelongsToAccessor<Publication, typeof Report.prototype.id>;

  public readonly informer: BelongsToAccessor<User, typeof Report.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('PublicationRepository') protected publicationRepositoryGetter: Getter<PublicationRepository>, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Report, dataSource);
    this.informer = this.createBelongsToAccessorFor('informer', userRepositoryGetter,);
    this.registerInclusionResolver('informer', this.informer.inclusionResolver);
    this.publication = this.createBelongsToAccessorFor('publication', publicationRepositoryGetter,);
    this.registerInclusionResolver('publication', this.publication.inclusionResolver);
  }
}
