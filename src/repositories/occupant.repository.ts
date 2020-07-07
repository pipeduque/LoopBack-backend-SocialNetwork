import {DefaultCrudRepository} from '@loopback/repository';
import {Occupant, OccupantRelations} from '../models';
import {MongoDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class OccupantRepository extends DefaultCrudRepository<
  Occupant,
  typeof Occupant.prototype.id,
  OccupantRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(Occupant, dataSource);
  }
}
