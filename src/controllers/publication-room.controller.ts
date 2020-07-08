import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Publication,
  Room,
} from '../models';
import {PublicationRepository} from '../repositories';

export class PublicationRoomController {
  constructor(
    @repository(PublicationRepository)
    public publicationRepository: PublicationRepository,
  ) { }

  @get('/publications/{id}/room', {
    responses: {
      '200': {
        description: 'Room belonging to Publication',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Room)},
          },
        },
      },
    },
  })
  async getRoom(
    @param.path.string('id') id: typeof Publication.prototype.id,
  ): Promise<Room> {
    return this.publicationRepository.room(id);
  }
}
