import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {Occupant, OccupantRelations, Room, User} from '../models';
import {MongoDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {RoomRepository} from './room.repository';
import {UserRepository} from './user.repository';

export class OccupantRepository extends DefaultCrudRepository<
  Occupant,
  typeof Occupant.prototype.id,
  OccupantRelations
> {

  public readonly room: HasOneRepositoryFactory<Room, typeof Occupant.prototype.id>;

  public readonly user: HasOneRepositoryFactory<User, typeof Occupant.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('RoomRepository') protected roomRepositoryGetter: Getter<RoomRepository>, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Occupant, dataSource);
    this.user = this.createHasOneRepositoryFactoryFor('user', userRepositoryGetter);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
    this.room = this.createHasOneRepositoryFactoryFor('room', roomRepositoryGetter);
    this.registerInclusionResolver('room', this.room.inclusionResolver);
  }
}
