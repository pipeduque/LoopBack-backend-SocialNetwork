import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Occupant,
  Room,
} from '../models';
import {OccupantRepository} from '../repositories';

export class OccupantRoomController {
  constructor(
    @repository(OccupantRepository)
    public occupantRepository: OccupantRepository,
  ) { }

  @get('/occupants/{id}/room', {
    responses: {
      '200': {
        description: 'Room belonging to Occupant',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Room)},
          },
        },
      },
    },
  })
  async getRoom(
    @param.path.string('id') id: typeof Occupant.prototype.id,
  ): Promise<Room> {
    return this.occupantRepository.room(id);
  }
}
