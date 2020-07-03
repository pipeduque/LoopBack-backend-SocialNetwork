import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {PublicationFile, PublicationFileRelations, Publication} from '../models';
import {MongoDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {PublicationRepository} from './publication.repository';

export class PublicationFileRepository extends DefaultCrudRepository<
  PublicationFile,
  typeof PublicationFile.prototype.id,
  PublicationFileRelations
> {

  public readonly publication: BelongsToAccessor<Publication, typeof PublicationFile.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('PublicationRepository') protected publicationRepositoryGetter: Getter<PublicationRepository>,
  ) {
    super(PublicationFile, dataSource);
    this.publication = this.createBelongsToAccessorFor('publication', publicationRepositoryGetter,);
    this.registerInclusionResolver('publication', this.publication.inclusionResolver);
  }
}
