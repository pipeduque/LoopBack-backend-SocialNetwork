import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Owner, OwnerRelations, Ownerhasfollowers, Room} from '../models';
import {MongoDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {OwnerhasfollowersRepository} from './ownerhasfollowers.repository';
import {RoomRepository} from './room.repository';

export class OwnerRepository extends DefaultCrudRepository<
  Owner,
  typeof Owner.prototype.id,
  OwnerRelations
> {

  public readonly ownerhasfollowers: HasManyRepositoryFactory<Ownerhasfollowers, typeof Owner.prototype.id>;

  public readonly rooms: HasManyRepositoryFactory<Room, typeof Owner.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('OwnerhasfollowersRepository') protected ownerhasfollowersRepositoryGetter: Getter<OwnerhasfollowersRepository>, @repository.getter('RoomRepository') protected roomRepositoryGetter: Getter<RoomRepository>,
  ) {
    super(Owner, dataSource);
    this.rooms = this.createHasManyRepositoryFactoryFor('rooms', roomRepositoryGetter,);
    this.registerInclusionResolver('rooms', this.rooms.inclusionResolver);
    this.ownerhasfollowers = this.createHasManyRepositoryFactoryFor('ownerhasfollowers', ownerhasfollowersRepositoryGetter,);
    this.registerInclusionResolver('ownerhasfollowers', this.ownerhasfollowers.inclusionResolver);
  }
}
