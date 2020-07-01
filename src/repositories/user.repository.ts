import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {User, UserRelations, Publication} from '../models';
import {MongoDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {PublicationRepository} from './publication.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {

  public readonly publications: HasManyRepositoryFactory<Publication, typeof User.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('PublicationRepository') protected publicationRepositoryGetter: Getter<PublicationRepository>,
  ) {
    super(User, dataSource);
    this.publications = this.createHasManyRepositoryFactoryFor('publications', publicationRepositoryGetter,);
    this.registerInclusionResolver('publications', this.publications.inclusionResolver);
  }
}
