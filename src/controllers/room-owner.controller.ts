import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Room,
  Owner,
} from '../models';
import {RoomRepository} from '../repositories';

export class RoomOwnerController {
  constructor(
    @repository(RoomRepository)
    public roomRepository: RoomRepository,
  ) { }

  @get('/rooms/{id}/owner', {
    responses: {
      '200': {
        description: 'Owner belonging to Room',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Owner)},
          },
        },
      },
    },
  })
  async getOwner(
    @param.path.string('id') id: typeof Room.prototype.id,
  ): Promise<Owner> {
    return this.roomRepository.owner(id);
  }
}
