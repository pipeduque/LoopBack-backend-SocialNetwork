import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {Publication, PublicationRelations, User, Room} from '../models';
import {MongoDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UserRepository} from './user.repository';
import {RoomRepository} from './room.repository';

export class PublicationRepository extends DefaultCrudRepository<
  Publication,
  typeof Publication.prototype.id,
  PublicationRelations
> {

  public readonly user: BelongsToAccessor<User, typeof Publication.prototype.id>;

  public readonly room: BelongsToAccessor<Room, typeof Publication.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('RoomRepository') protected roomRepositoryGetter: Getter<RoomRepository>,
  ) {
    super(Publication, dataSource);
    this.room = this.createBelongsToAccessorFor('room', roomRepositoryGetter,);
    this.registerInclusionResolver('room', this.room.inclusionResolver);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
