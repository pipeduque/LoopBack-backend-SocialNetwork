import {DefaultCrudRepository} from '@loopback/repository';
import {Ownerhasfollowers, OwnerhasfollowersRelations} from '../models';
import {MongoDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class OwnerhasfollowersRepository extends DefaultCrudRepository<
  Ownerhasfollowers,
  typeof Ownerhasfollowers.prototype.id,
  OwnerhasfollowersRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(Ownerhasfollowers, dataSource);
  }
}
