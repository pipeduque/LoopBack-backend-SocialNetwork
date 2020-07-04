import {DefaultCrudRepository, repository, HasOneRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {Room, RoomRelations, Publication, Occupant, Request, Owner} from '../models';
import {MongoDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {PublicationRepository} from './publication.repository';
import {OccupantRepository} from './occupant.repository';
import {RequestRepository} from './request.repository';
import {OwnerRepository} from './owner.repository';

export class RoomRepository extends DefaultCrudRepository<
  Room,
  typeof Room.prototype.id,
  RoomRelations
> {

  public readonly publication: HasOneRepositoryFactory<Publication, typeof Room.prototype.id>;

  public readonly occupants: HasManyRepositoryFactory<Occupant, typeof Room.prototype.id>;

  public readonly requests: HasManyRepositoryFactory<Request, typeof Room.prototype.id>;

  public readonly owner: HasOneRepositoryFactory<Owner, typeof Room.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('PublicationRepository') protected publicationRepositoryGetter: Getter<PublicationRepository>, @repository.getter('OccupantRepository') protected occupantRepositoryGetter: Getter<OccupantRepository>, @repository.getter('RequestRepository') protected requestRepositoryGetter: Getter<RequestRepository>, @repository.getter('OwnerRepository') protected ownerRepositoryGetter: Getter<OwnerRepository>,
  ) {
    super(Room, dataSource);
    this.owner = this.createHasOneRepositoryFactoryFor('owner', ownerRepositoryGetter);
    this.registerInclusionResolver('owner', this.owner.inclusionResolver);
    this.requests = this.createHasManyRepositoryFactoryFor('requests', requestRepositoryGetter,);
    this.registerInclusionResolver('requests', this.requests.inclusionResolver);
    this.occupants = this.createHasManyRepositoryFactoryFor('occupants', occupantRepositoryGetter,);
    this.registerInclusionResolver('occupants', this.occupants.inclusionResolver);
    this.publication = this.createHasOneRepositoryFactoryFor('publication', publicationRepositoryGetter);
    this.registerInclusionResolver('publication', this.publication.inclusionResolver);
  }
}
