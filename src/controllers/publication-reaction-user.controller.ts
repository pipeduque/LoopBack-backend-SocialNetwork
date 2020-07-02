import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  PublicationReaction,
  User,
} from '../models';
import {PublicationReactionRepository} from '../repositories';

export class PublicationReactionUserController {
  constructor(
    @repository(PublicationReactionRepository)
    public publicationReactionRepository: PublicationReactionRepository,
  ) { }

  @get('/publication-reactions/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to PublicationReaction',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(
    @param.path.string('id') id: typeof PublicationReaction.prototype.id,
  ): Promise<User> {
    return this.publicationReactionRepository.user(id);
  }
}
