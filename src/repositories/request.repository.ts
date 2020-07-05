import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {Request, RequestRelations, Room, User} from '../models';
import {MongoDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {RoomRepository} from './room.repository';
import {UserRepository} from './user.repository';

export class RequestRepository extends DefaultCrudRepository<
  Request,
  typeof Request.prototype.id,
  RequestRelations
> {

  public readonly room: HasOneRepositoryFactory<Room, typeof Request.prototype.id>;

  public readonly user: HasOneRepositoryFactory<User, typeof Request.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('RoomRepository') protected roomRepositoryGetter: Getter<RoomRepository>, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Request, dataSource);
    this.user = this.createHasOneRepositoryFactoryFor('user', userRepositoryGetter);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
    this.room = this.createHasOneRepositoryFactoryFor('room', roomRepositoryGetter);
    this.registerInclusionResolver('room', this.room.inclusionResolver);
  }
}
