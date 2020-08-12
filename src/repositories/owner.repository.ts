import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Owner, OwnerRelations, Ownerhasfollowers, Room, Follower} from '../models';
import {MongoDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {OwnerhasfollowersRepository} from './ownerhasfollowers.repository';
import {RoomRepository} from './room.repository';
import {FollowerRepository} from './follower.repository';

export class OwnerRepository extends DefaultCrudRepository<
  Owner,
  typeof Owner.prototype.id,
  OwnerRelations
> {

  public readonly ownerhasfollowers: HasManyRepositoryFactory<Ownerhasfollowers, typeof Owner.prototype.id>;

  public readonly rooms: HasManyRepositoryFactory<Room, typeof Owner.prototype.id>;

  public readonly followers: HasManyRepositoryFactory<Follower, typeof Owner.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('OwnerhasfollowersRepository') protected ownerhasfollowersRepositoryGetter: Getter<OwnerhasfollowersRepository>, @repository.getter('RoomRepository') protected roomRepositoryGetter: Getter<RoomRepository>, @repository.getter('FollowerRepository') protected followerRepositoryGetter: Getter<FollowerRepository>,
  ) {
    super(Owner, dataSource);
    this.followers = this.createHasManyRepositoryFactoryFor('followers', followerRepositoryGetter,);
    this.registerInclusionResolver('followers', this.followers.inclusionResolver);
    this.rooms = this.createHasManyRepositoryFactoryFor('rooms', roomRepositoryGetter,);
    this.registerInclusionResolver('rooms', this.rooms.inclusionResolver);
    this.ownerhasfollowers = this.createHasManyRepositoryFactoryFor('ownerhasfollowers', ownerhasfollowersRepositoryGetter,);
    this.registerInclusionResolver('ownerhasfollowers', this.ownerhasfollowers.inclusionResolver);
  }
}
