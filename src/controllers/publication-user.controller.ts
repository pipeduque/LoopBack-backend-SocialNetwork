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
  User,
} from '../models';
import {PublicationRepository} from '../repositories';

export class PublicationUserController {
  constructor(
    @repository(PublicationRepository)
    public publicationRepository: PublicationRepository,
  ) { }

  @get('/publications/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to Publication',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(
    @param.path.string('id') id: typeof Publication.prototype.id,
  ): Promise<User> {
    return this.publicationRepository.user(id);
  }
}
