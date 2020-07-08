import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Request,
  Room,
} from '../models';
import {RequestRepository} from '../repositories';

export class RequestRoomController {
  constructor(
    @repository(RequestRepository)
    public requestRepository: RequestRepository,
  ) { }

  @get('/requests/{id}/room', {
    responses: {
      '200': {
        description: 'Room belonging to Request',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Room)},
          },
        },
      },
    },
  })
  async getRoom(
    @param.path.string('id') id: typeof Request.prototype.id,
  ): Promise<Room> {
    return this.requestRepository.room(id);
  }
}
