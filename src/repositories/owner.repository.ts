import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Owner, OwnerRelations, Ownerhasfollowers} from '../models';
import {MongoDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {OwnerhasfollowersRepository} from './ownerhasfollowers.repository';

export class OwnerRepository extends DefaultCrudRepository<
  Owner,
  typeof Owner.prototype.id,
  OwnerRelations
> {

  public readonly ownerhasfollowers: HasManyRepositoryFactory<Ownerhasfollowers, typeof Owner.prototype.id>;


  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('OwnerhasfollowersRepository') protected ownerhasfollowersRepositoryGetter: Getter<OwnerhasfollowersRepository>,
  ) {
    super(Owner, dataSource);
    this.ownerhasfollowers = this.createHasManyRepositoryFactoryFor('ownerhasfollowers', ownerhasfollowersRepositoryGetter,);
    this.registerInclusionResolver('ownerhasfollowers', this.ownerhasfollowers.inclusionResolver);
  }
}
